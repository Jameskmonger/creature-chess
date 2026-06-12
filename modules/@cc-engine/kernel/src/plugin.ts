import { DefinesApi } from "./defines";
import { Logger } from "./logger";

export interface PluginManifest {
	/**
	 * A globally unique plugin id. By convention this is the plugin's npm package name,
	 * but it can be any string as long as it doesn't collide with other plugins.
	 */
	id: string;

	/**
	 * A semver version string for the plugin itself.
	 *
	 * @remarks This is not used by the loader but is available for plugins to report their own version in logs, telemetry, etc.
	 */
	version: string;

	/**
	 * A semver range specifying compatible kernel versions. The loader checks this against its own version and rejects plugins that don't match.
	 */
	kernelVersion: string;

	/**
	 * An optional list of other plugin ids that this plugin depends on.
	 *
	 * The kernel will ensure that plugins are enabled after, and disabled before, their dependencies.
	 */
	dependsOn?: readonly string[];
}

export interface PluginContext {
	logger: Logger;
	defines: DefinesApi;
}

export interface Plugin {
	/**
	 * The plugin's manifest.
	 */
	readonly manifest: PluginManifest;

	/**
	 * The plugin's entry point. The kernel calls this when enabling the plugin, after all dependencies are enabled.
	 * @param ctx The plugin context, which provides access to kernel services.
	 */
	onEnable(ctx: PluginContext): void | Promise<void>;

	/**
	 * An optional exit point. The kernel calls this when disabling the plugin, before all dependencies are disabled.
	 * @param ctx The plugin context, which provides access to kernel services.
	 */
	onDisable?(ctx: PluginContext): void | Promise<void>;
}

/**
 * A helper for defining plugins with proper typings. This is optional but recommended for better type safety.
 *
 * @param plugin The plugin definition object.
 *
 * @returns The same plugin object, typed as `Plugin`.
 */
export const definePlugin = (plugin: Plugin): Plugin => plugin;

/**
 * A helper interface for the relevant fields from `package.json` when defining a plugin from package metadata.
 */
export interface PluginPackageJson {
	name?: string;
	version?: string;
	peerDependencies?: Record<string, string>;
	dependencies?: Record<string, string>;
}

/**
 * Creates a plugin definition from a `package.json`-like object and a partial plugin implementation.
 *
 * ```ts
 * import { definePluginFromPackage } from "@cc-engine/kernel";
 * import pkg from "../package.json";
 *
 * export default definePluginFromPackage(pkg, {
 *   onEnable: (ctx) => { ... },
 * });
 * ```
 */
export const definePluginFromPackage = (
	pkg: PluginPackageJson,
	def: Omit<Plugin, "manifest"> & Partial<Pick<Plugin, "onDisable">>
): Plugin => {
	if (!pkg.name || !pkg.version) {
		throw new Error(
			"definePluginFromPackage: package.json must have non-empty 'name' and 'version'"
		);
	}
	const rawRange =
		pkg.peerDependencies?.["@cc-engine/kernel"] ??
		pkg.dependencies?.["@cc-engine/kernel"] ??
		// A sentinel value that will fail to satisfy any real semver range.
		"0.0.0";
	const kernelRange = rawRange.startsWith("workspace:") ? "*" : rawRange;
	return definePlugin({
		manifest: {
			id: pkg.name,
			version: pkg.version,
			kernelVersion: kernelRange,
		},
		onEnable: def.onEnable,
		onDisable: def.onDisable,
	});
};
