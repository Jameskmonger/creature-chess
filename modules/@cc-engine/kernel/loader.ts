// Server-only subpath. Importable as `@cc-engine/kernel/loader`. Kept
// out of the main package entry so web bundles don't pull the dynamic
// `require()` machinery into the browser. Server-side code (the
// game-server's startup) imports from here.
export {
	PluginLoader,
	type PluginLoaderOptions,
	type LoadResult,
	type LoadFailure,
	type LoadFailurePhase,
} from "./src/loader";
