import { Socket } from "socket.io";

import { PlayerProfile } from "@creature-chess/models/player";
import {
	ClientToServer,
	GameServerToClient,
	LobbyClientToServer,
	LobbyServerToClient,
} from "@creature-chess/networking";
import { HandshakeRequest } from "@creature-chess/networking/handshake";

type GuestSocketData = {
	type: "guest";
	id: string;
	nickname: string;
	profile: PlayerProfile;
};

type PlayerSocketData = {
	type: "player";
	id: string;
	nickname: string | null;
	profile: PlayerProfile | null;
};

type AuthenticatedSocketData = GuestSocketData | PlayerSocketData;

type HandshakeEvents = {
	authenticate: (request: HandshakeRequest) => void;
};

type AuthenticateResponseEvents = {
	authenticate_response: (response: GameServerToClient.AuthenticateResponse) => void;
};

/**
 * Socket used during lobby phase.
 * Listens for lobby client events + handshake, emits lobby server events + auth response.
 */
export type LobbySocket = Socket<
	LobbyClientToServer.Events & HandshakeEvents,
	LobbyServerToClient.Events & AuthenticateResponseEvents,
	Record<string, never>,
	AuthenticatedSocketData
> & { data: Required<AuthenticatedSocketData> };

/**
 * Socket used during game phase.
 * Listens for game client events, emits game server events.
 */
export type GameSocket = Socket<
	ClientToServer.Events,
	GameServerToClient.Events,
	Record<string, never>,
	AuthenticatedSocketData
> & { data: Required<AuthenticatedSocketData> };

/**
 * Socket before it has been assigned to lobby or game context.
 * Used during handshake.
 */
export type AuthenticatedSocket = Socket<
	HandshakeEvents,
	AuthenticateResponseEvents,
	Record<string, never>,
	AuthenticatedSocketData
> & { data: Required<AuthenticatedSocketData> };
