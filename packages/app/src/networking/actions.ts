import { LobbyPlayer } from "@creature-chess/models";
import { ServerToClient } from "@creature-chess/networking";

export const LOBBY_CONNECTED_EVENT = "LOBBY_CONNECTED_EVENT";
export type LOBBY_CONNECTED_EVENT = typeof LOBBY_CONNECTED_EVENT;
export const GAME_CONNECTED_EVENT = "GAME_CONNECTED_EVENT";
export type GAME_CONNECTED_EVENT = typeof GAME_CONNECTED_EVENT;

export type LobbyConnectedEventPayload = {
    lobbyId: string;
    players: LobbyPlayer[];
    startTimestamp: number;
};
export type LobbyConnectedEvent = {
    type: LOBBY_CONNECTED_EVENT,
    payload: LobbyConnectedEventPayload
};

export type GameConnectedEvent = { type: GAME_CONNECTED_EVENT, payload: ServerToClient.Menu.GameConnectionPacket };

export const lobbyConnectedEvent = (lobbyId: string, players: LobbyPlayer[], startTimestamp: number): LobbyConnectedEvent => ({
    type: LOBBY_CONNECTED_EVENT,
    payload: {
        lobbyId,
        players,
        startTimestamp
    }
});

export const gameConnectedEvent = (payload: ServerToClient.Menu.GameConnectionPacket): GameConnectedEvent => ({ type: GAME_CONNECTED_EVENT, payload });
