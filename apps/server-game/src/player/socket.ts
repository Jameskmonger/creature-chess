import { Socket } from "socket.io";

import { ResolvedIdentity } from "@creature-chess/gamemode";
import {
	ClientToServer,
	GameServerToClient,
	LobbyClientToServer,
	LobbyServerToClient,
} from "@creature-chess/networking";
import { HandshakeRequest } from "@creature-chess/networking";


type AuthenticatedSocketData = ResolvedIdentity;

type HandshakeEvents = {
	authenticate: (request: HandshakeRequest) => void;
};

/**
 * Matchmaking commands issued by the client once authenticated.
 * - `play` finds, reconnects to, or creates a game.
 * - `reconnect` only rejoins an existing game/lobby.
 */
type MatchmakingEvents = {
	play: () => void;
	reconnect: () => void;
};

type AuthenticateResponseEvents = {
	authenticate_response: (
		response: GameServerToClient.AuthenticateResponse
	) => void;
	noGame: () => void;
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
	HandshakeEvents & MatchmakingEvents,
	AuthenticateResponseEvents,
	Record<string, never>,
	AuthenticatedSocketData
> & { data: Required<AuthenticatedSocketData> };
