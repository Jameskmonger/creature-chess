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

export type SessionIdentity = {
	/** Stable id (e.g. account id), empty for an anonymous guest. */
	id: string;
	/** Display name shown in menus. */
	name: string;
	/** Absolute profile-picture URL, or null for none. */
	picture: string | null;
};

/**
 * A pluggable identity provider. Supplies the handshake sent on connect.
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
	/** The current display identity, or null when this source has none. */
	getIdentity?(): SessionIdentity | null;
	/** Subscribe to identity changes (login/logout). Returns an unsubscribe. */
	subscribe?(listener: () => void): () => void;
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
