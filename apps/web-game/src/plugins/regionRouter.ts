import * as React from "react";

import {
	AugmentOperation,
	RegionDescriptor,
	RemoveOperation,
	ReplaceOperation,
	TransformOperation,
	UiOperation,
	WrapOperation,
} from "@cc-plugins/api";

import { ClientPluginRegistry, pluginRegistry } from "./registry";

/** Phases compose `remove -> replace -> wrap -> augment -> transform`. */
export type ResolvedOps = {
	remove?: Resolved<RemoveOperation>;
	replace?: Resolved<ReplaceOperation>;
	wraps: readonly Resolved<WrapOperation>[];
	augmentBefore: readonly Resolved<AugmentOperation>[];
	augmentAfter: readonly Resolved<AugmentOperation>[];
	transforms: readonly Resolved<TransformOperation>[];
};

type Resolved<T extends UiOperation> = T & { pluginId: string };

const topoSortByDependsOn = <T extends UiOperation>(
	ops: readonly Resolved<T>[]
): Resolved<T>[] => {
	if (ops.length <= 1) {
		return [...ops];
	}
	const known = new Set(ops.map((o) => o.id).filter((x): x is string => !!x));
	const incoming = new Map<number, number>();
	const edges = new Map<string, number[]>();

	ops.forEach((op, idx) => {
		const deps = (op.dependsOn ?? []).filter((d) => {
			if (!known.has(d)) {
				// eslint-disable-next-line no-console
				console.warn(
					`[plugin-ui] "${op.id ?? op.pluginId}" dependsOn "${d}" which no op declared in this phase; dropping the edge`
				);
				return false;
			}
			return true;
		});
		incoming.set(idx, deps.length);
		for (const d of deps) {
			const arr = edges.get(d) ?? [];
			arr.push(idx);
			edges.set(d, arr);
		}
	});

	const ready: number[] = [];
	ops.forEach((_, idx) => {
		if ((incoming.get(idx) ?? 0) === 0) {
			ready.push(idx);
		}
	});

	const out: Resolved<T>[] = [];
	while (ready.length > 0) {
		const idx = ready.shift()!;
		const op = ops[idx];
		out.push(op);
		if (op.id) {
			for (const next of edges.get(op.id) ?? []) {
				const left = (incoming.get(next) ?? 0) - 1;
				incoming.set(next, left);
				if (left === 0) {
					ready.push(next);
				}
			}
		}
	}

	if (out.length < ops.length) {
		// eslint-disable-next-line no-console
		console.warn(
			`[plugin-ui] dependency cycle in phase; running ${ops.length - out.length} ops in load order`
		);
		const seen = new Set(out);
		for (const op of ops) {
			if (!seen.has(op)) {
				out.push(op);
			}
		}
	}
	return out;
};

export class RegionRouter {
	private readonly cache = new Map<string, ResolvedOps>();
	private cachedRegistrations: Resolved<UiOperation>[] | null = null;

	public constructor(private readonly registry: ClientPluginRegistry) {
		this.registry.onChange(() => {
			this.cache.clear();
			this.cachedRegistrations = null;
		});
	}

	public get hasUiOps(): boolean {
		return this.registrations.length > 0;
	}

	private get registrations(): Resolved<UiOperation>[] {
		if (this.cachedRegistrations) {
			return this.cachedRegistrations;
		}
		const out: Resolved<UiOperation>[] = [];
		for (const plugin of this.registry.list()) {
			for (const op of plugin.ui ?? []) {
				out.push({ ...op, pluginId: plugin.id });
			}
		}
		this.cachedRegistrations = out;
		return out;
	}

	public resolveRegion(region: RegionDescriptor): ResolvedOps {
		// Every Region passes exactly one class.
		const cacheKey = `${region.id}|${region.classes[0]}`;
		const cached = this.cache.get(cacheKey);
		if (cached) {
			return cached;
		}

		const matched = this.registrations.filter((r) => r.match(region));

		const removes = matched.filter(
			(o): o is Resolved<RemoveOperation> => o.kind === "remove"
		);
		const replaces = matched.filter(
			(o): o is Resolved<ReplaceOperation> => o.kind === "replace"
		);
		const wraps = matched.filter(
			(o): o is Resolved<WrapOperation> => o.kind === "wrap"
		);
		const augments = matched.filter(
			(o): o is Resolved<AugmentOperation> => o.kind === "augment"
		);
		const transforms = matched.filter(
			(o): o is Resolved<TransformOperation> => o.kind === "transform"
		);

		if (replaces.length > 1) {
			const winner = replaces[replaces.length - 1];
			const losers = replaces.slice(0, -1).map((r) => r.pluginId);
			// eslint-disable-next-line no-console
			console.warn(
				`[plugin-ui] multiple replaces on region "${region.id}"; "${winner.pluginId}" wins, ignored: ${losers.join(", ")}`
			);
		}

		const ops: ResolvedOps = {
			remove: removes[0],
			replace: replaces[replaces.length - 1],
			wraps: topoSortByDependsOn(wraps),
			augmentBefore: topoSortByDependsOn(
				augments.filter((a) => a.slot === "before")
			),
			augmentAfter: topoSortByDependsOn(
				augments.filter((a) => a.slot === "after")
			),
			transforms: topoSortByDependsOn(transforms),
		};

		this.cache.set(cacheKey, ops);
		return ops;
	}
}

export const composeRegion = (
	ops: ResolvedOps,
	children: React.ReactNode,
	ctx: unknown,
	region: RegionDescriptor
): React.ReactNode => {
	if (ops.remove) {
		return null;
	}
	let node: React.ReactNode = ops.replace
		? ops.replace.render(ctx, region)
		: children;
	// Apply wraps in registration order so the last applied is outermost.
	for (const w of ops.wraps) {
		node = w.render(node, ctx, region);
	}
	const before = ops.augmentBefore.map((a, i) =>
		React.createElement(React.Fragment, { key: `b${i}` }, a.render(ctx, region))
	);
	const after = ops.augmentAfter.map((a, i) =>
		React.createElement(React.Fragment, { key: `a${i}` }, a.render(ctx, region))
	);
	if (before.length > 0 || after.length > 0) {
		node = React.createElement(React.Fragment, null, ...before, node, ...after);
	}
	for (const t of ops.transforms) {
		node = t.render(node, ctx, region);
	}
	return node;
};

export const regionRouter = new RegionRouter(pluginRegistry);
