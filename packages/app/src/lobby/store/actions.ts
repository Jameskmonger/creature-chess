import { LobbyPlayer } from "@creature-chess/models";
import { GameConnectionPacket } from "@creature-chess/shared/lib/networking";

export const JOIN_LOBBY = "JOIN_LOBBY";
export type JOIN_LOBBY = typeof JOIN_LOBBY;
export const GAME_CONNECTED = "GAME_CONNECTED";
export type GAME_CONNECTED = typeof GAME_CONNECTED;
export const LOBBY_GAME_STARTED_EVENT = "LOBBY_GAME_STARTED_EVENT";
export type LOBBY_GAME_STARTED_EVENT = typeof LOBBY_GAME_STARTED_EVENT;

export const UPDATE_LOBBY_PLAYER = "UPDATE_LOBBY_PLAYER";
export type UPDATE_LOBBY_PLAYER = typeof UPDATE_LOBBY_PLAYER;

export type JoinLobbyAction = {
    type: JOIN_LOBBY,
    payload: {
        localPlayerId: string;
        lobbyId: string;
        players: LobbyPlayer[];
        startTimestamp: number;
    }
};

export type GameConnectedEvent = { type: GAME_CONNECTED, payload: GameConnectionPacket };

export type LobbyGameStartedEvent = { type: LOBBY_GAME_STARTED_EVENT };

export type UpdateLobbyPlayerAction = {
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index: number;
        player: LobbyPlayer;
    }
};

export type LobbyAction = JoinLobbyAction
    | UpdateLobbyPlayerAction
    | LobbyGameStartedEvent;

// todo rename this to lobbyConnected (to match gameConnected)
export const joinLobbyAction = (localPlayerId: string, lobbyId: string, players: LobbyPlayer[], startTimestamp: number): JoinLobbyAction => ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId,
        lobbyId,
        players,
        startTimestamp
    }
});

export const gameConnectedEvent = (payload: GameConnectionPacket): GameConnectedEvent => ({ type: GAME_CONNECTED, payload });

export const lobbyGameStartedEvent = (): LobbyGameStartedEvent => ({ type: LOBBY_GAME_STARTED_EVENT });

export const updateLobbyPlayerAction = (index: number, player: LobbyPlayer): UpdateLobbyPlayerAction => ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index,
        player
    }
});
