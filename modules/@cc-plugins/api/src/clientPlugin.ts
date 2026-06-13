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

export type SessionHandshake = { type: string; data: unknown };

/**
 * Supplies the handshake the client sends when connecting.
 */
export type SessionSource = {
	/** Stable id, conventionally the handshake `type` it emits. */
	id: string;
	/** Higher runs first. */
	priority?: number;
	/** Whether this source can currently provide a session (e.g. logged in). */
	isAvailable(): boolean;
	/** Build the handshake (may fetch a token). Return null to fall through. */
	createHandshake(): Promise<SessionHandshake | null>;
};

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

	/**
	 * Session sources that supply the handshake on connect.
	 */
	sessionSources?: readonly SessionSource[];
};
