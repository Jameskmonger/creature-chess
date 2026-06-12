import semver from "semver";

import { Logger, scopedLogger } from "./logger";
import { Plugin, PluginContext, PluginManifest } from "./plugin";
import { topoSort } from "./topoSort";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const kernelPackageJson = require("@cc-engine/kernel/package.json");
const KERNEL_VERSION: string = kernelPackageJson.version;

export type LoadFailurePhase =
	| "require"
	| "validate"
	| "kernelVersion"
	| "dependsOn"
	| "onEnable"
	| "onDisable";

export interface LoadFailure {
	plugin: string;
	phase: LoadFailurePhase;
	error: string;
}

export interface LoadResult {
	loaded: Plugin[];
	failed: LoadFailure[];
}

const validateManifest = (manifest: PluginManifest): string | null => {
	for (const field of ["id", "version", "kernelVersion"] as const) {
		const value = manifest[field];
		if (typeof value !== "string" || value.length === 0) {
			return `'${field}' must be a non-empty string (got ${typeof value})`;
		}
	}
	return null;
};

/**
 * Topo-sort by `manifest.dependsOn`.
 *
 * Plugins referencing an id not in the batch, or part of a cycle,
 * are emitted in `failedDependsOn` with a reason. The remainder come
 * back in load order.
 */
const topoSortByDependsOn = (
	plugins: readonly Plugin[]
): {
	ordered: Plugin[];
	failedDependsOn: { plugin: Plugin; reason: string }[];
} => {
	const idsInBatch = new Set(plugins.map((p) => p.manifest.id));
	const failedDependsOn: { plugin: Plugin; reason: string }[] = [];
	const eligible: Plugin[] = [];

	for (const plugin of plugins) {
		const deps = plugin.manifest.dependsOn ?? [];
		const missing = deps.filter((d) => !idsInBatch.has(d));
		if (missing.length > 0) {
			failedDependsOn.push({
				plugin,
				reason: `unsatisfied dependsOn: ${missing.join(", ")}`,
			});
			continue;
		}
		eligible.push(plugin);
	}

	const cyclic = new Set<string>();
	const ordered = topoSort(
		eligible,
		(p) => p.manifest.id,
		(p) => p.manifest.dependsOn ?? [],
		(problem) => {
			if (problem.kind === "cycle") {
				cyclic.add(problem.id);
			}
		}
	);

	const orderedNonCyclic = ordered.filter((p) => !cyclic.has(p.manifest.id));
	for (const plugin of ordered) {
		if (cyclic.has(plugin.manifest.id)) {
			failedDependsOn.push({ plugin, reason: "part of a dependsOn cycle" });
		}
	}

	return { ordered: orderedNonCyclic, failedDependsOn };
};

export interface PluginLoaderOptions {
	logger: Logger;
}

type Scopeable = { scopedTo(origin: { plugin: string }): unknown };

const isScopeable = (value: unknown): value is Scopeable =>
	typeof value === "object" &&
	value !== null &&
	typeof (value as { scopedTo?: unknown }).scopedTo === "function";

const scopePerPlugin = (
	ctx: PluginContext,
	pluginId: string
): Partial<PluginContext> => {
	const origin = { plugin: pluginId };
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(ctx)) {
		if (isScopeable(value)) {
			out[key] = value.scopedTo(origin);
		}
	}
	return out as Partial<PluginContext>;
};

export class PluginLoader {
	private readonly logger: Logger;

	public constructor(options: PluginLoaderOptions) {
		this.logger = options.logger;
	}

	public async load(
		pluginPackageNames: readonly string[],
		ctx: PluginContext
	): Promise<LoadResult> {
		const loaded: Plugin[] = [];
		const failed: LoadFailure[] = [];

		const fail = (
			name: string,
			phase: LoadFailurePhase,
			message: string,
			extra: Record<string, unknown> = {}
		) => {
			this.logger.error(`Plugin ${name}: ${message}`, {
				plugin: name,
				phase,
				...extra,
			});
			failed.push({ plugin: name, phase, error: message });
		};

		const viable: Plugin[] = [];
		for (const name of pluginPackageNames) {
			let mod: { default?: Plugin; plugin?: Plugin };
			try {
				mod = require(name);
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				fail(name, "require", `failed to require module - ${message}`);
				continue;
			}

			const plugin: Plugin | undefined = mod.default ?? mod.plugin;

			if (
				!plugin ||
				typeof plugin.onEnable !== "function" ||
				!plugin.manifest
			) {
				fail(
					name,
					"validate",
					"invalid shape (expected default export with manifest and onEnable)"
				);
				continue;
			}

			const manifestError = validateManifest(plugin.manifest);
			if (manifestError) {
				fail(name, "validate", `malformed manifest - ${manifestError}`);
				continue;
			}

			if (!semver.satisfies(KERNEL_VERSION, plugin.manifest.kernelVersion, { includePrerelease: false })) {
				fail(
					plugin.manifest.id,
					"kernelVersion",
					`kernelVersion '${plugin.manifest.kernelVersion}' not satisfied by kernel ${KERNEL_VERSION}`,
					{ version: plugin.manifest.version, kernelVersion: KERNEL_VERSION }
				);
				continue;
			}

			viable.push(plugin);
		}

		const { ordered, failedDependsOn } = topoSortByDependsOn(viable);
		for (const { plugin, reason } of failedDependsOn) {
			fail(plugin.manifest.id, "dependsOn", reason, {
				version: plugin.manifest.version,
			});
		}

		const loadedIds = new Set<string>();

		const enableOne = async (plugin: Plugin): Promise<void> => {
			// Auto-scope any ctx field that implements `.scopedTo({ plugin })` so
			// declaration-merged plugin-context fields (creatures, defines, ...)
			// stamp writes with the plugin's id.
			const scopedFields = scopePerPlugin(ctx, plugin.manifest.id);
			const pluginCtx: PluginContext = {
				...ctx,
				...scopedFields,
				logger: scopedLogger(ctx.logger, { plugin: plugin.manifest.id }),
			};

			try {
				await plugin.onEnable(pluginCtx);
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				fail(plugin.manifest.id, "onEnable", `onEnable threw - ${message}`, {
					version: plugin.manifest.version,
					stack: err instanceof Error ? err.stack : undefined,
				});
				return;
			}

			const id = `${plugin.manifest.id}@${plugin.manifest.version}`;
			this.logger.info(`Loaded plugin: ${id}`);
			loaded.push(plugin);
		};

		// `ordered` is in dependency order. Process it in layers: each layer is
		// every still-pending plugin whose deps have all loaded, enabled
		// concurrently. A plugin whose dep failed is dropped (recorded failed)
		// before it can reach a layer, so its own dependents fail in turn.
		let pending = [...ordered];
		while (pending.length > 0) {
			const pendingIds = new Set(pending.map((p) => p.manifest.id));
			const layer: Plugin[] = [];
			const deferred: Plugin[] = [];

			for (const plugin of pending) {
				const deps = plugin.manifest.dependsOn ?? [];
				const failedDep = deps.find(
					(d) => !loadedIds.has(d) && !pendingIds.has(d)
				);
				if (failedDep) {
					fail(
						plugin.manifest.id,
						"dependsOn",
						`dependency '${failedDep}' failed to load`,
						{ version: plugin.manifest.version }
					);
					continue;
				}
				if (deps.every((d) => loadedIds.has(d))) {
					layer.push(plugin);
				} else {
					deferred.push(plugin);
				}
			}

			await Promise.all(layer.map(enableOne));
			for (const plugin of layer) {
				if (loaded.includes(plugin)) {
					loadedIds.add(plugin.manifest.id);
				}
			}

			pending = deferred;
		}

		return { loaded, failed };
	}

	public async unload(
		plugins: readonly Plugin[],
		ctx: PluginContext
	): Promise<LoadFailure[]> {
		const failed: LoadFailure[] = [];
		for (const plugin of [...plugins].reverse()) {
			if (!plugin.onDisable) {
				continue;
			}
			const pluginCtx: PluginContext = {
				...ctx,
				logger: scopedLogger(ctx.logger, { plugin: plugin.manifest.id }),
			};
			try {
				await plugin.onDisable(pluginCtx);
				this.logger.info(`Unloaded plugin: ${plugin.manifest.id}`);
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				this.logger.error(
					`Plugin ${plugin.manifest.id}: onDisable threw - ${message}`,
					{ plugin: plugin.manifest.id, phase: "onDisable" }
				);
				failed.push({
					plugin: plugin.manifest.id,
					phase: "onDisable",
					error: message,
				});
			}
		}
		return failed;
	}
}
