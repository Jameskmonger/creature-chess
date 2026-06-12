import {
	Dispatch,
	Reducer,
	TypedStartListening,
	UnknownAction,
} from "@reduxjs/toolkit";

import { UiOperation } from "./ui";
import { WireActionCreator } from "./wireAction";

export type PluginStartListening = TypedStartListening<
	unknown,
	Dispatch<UnknownAction>,
	unknown
>;

/**
 * The client side of a plugin.
 */
export type ClientPlugin = {
	/** Matches the server plugin id, conventionally `@scope/<name>`. */
	id: string;

	/**
	 * Redux reducers to mount under `state.game.plugins[<plugin-id>]`.
	 */
	reducers?: Record<string, Reducer>;

	/**
	 * Listener-middleware setup callbacks. Each is invoked once on
	 * bootstrap with `PluginStartListening`.
	 */
	listeners?: ((startListening: PluginStartListening) => void)[];

	/**
	 * Networked actions/events the plugin exchanges with the server.
	 */
	wire?: {
		inbound?: readonly WireActionCreator[];
		outbound?: readonly WireActionCreator[];
	};

	/**
	 * UI operations contributed to the host's Region pipeline. Build
	 * via the verb helpers (`replace`, `wrap`, `augment`, `remove`) or
	 * `transformForClass` for the escape case.
	 */
	ui?: UiOperation[];
};
