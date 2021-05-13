import { ServerToClient } from "@creature-chess/networking";
import { createAction } from "@reduxjs/toolkit";

export type LobbyConnectedEvent = ReturnType<typeof lobbyConnectedEvent>;
export const lobbyConnectedEvent = createAction<ServerToClient.Lobby.LobbyConnectionPacket, "lobbyConnectedEvent">("lobbyConnectedEvent");

export type GameConnectedEvent = ReturnType<typeof gameConnectedEvent>;
export const gameConnectedEvent = createAction<ServerToClient.Game.GameConnectionPacket, "gameConnectedEvent">("gameConnectedEvent");
