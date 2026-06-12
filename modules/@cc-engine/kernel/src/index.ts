// Client-safe surface - exports that can be safely bundled into the
// browser. `PluginLoader` (which uses dynamic `require`) lives at
// `@cc-engine/kernel/loader` so it never reaches the web bundle.
export type { Logger } from "./logger";
export {
	type Plugin,
	type PluginManifest,
	type PluginContext,
	type PluginPackageJson,
	definePlugin,
	definePluginFromPackage,
} from "./plugin";
export {
	type Defines,
	type DefinesPath,
	type DefinesValueAt,
	type DefinesOrigin,
	DefinesApi,
} from "./defines";
export { scopedLogger } from "./logger";
export { TypedEventEmitter } from "./typedEventEmitter";
export { topoSort, type TopoSortProblem } from "./topoSort";
