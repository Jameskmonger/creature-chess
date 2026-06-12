export {
	type ClientPluginRegistry,
	createClientPluginRegistry,
	pluginRegistry,
	registerClientPlugin,
} from "./registry";
export { RegionRouter, regionRouter, composeRegion } from "./regionRouter";
export type { ResolvedOps } from "./regionRouter";
export { buildPluginsReducer, setupPluginListeners } from "./redux";
export { WireProtocol, wireProtocol } from "./wireProtocol";
export type {
	InboundChannel,
	ValidatePayloadResult,
} from "./wireProtocol";
export {
	installPluginRuntime,
	loadClientPlugins,
	wirePluginHostState,
} from "./runtime";
export { Region } from "./Region";

// Re-exported for convenience
export { byId } from "@cc-plugins/api";
export type {
	ClientPlugin,
	RegionDescriptor,
	RegionMatcher,
	UiOperation,
} from "@cc-plugins/api";
