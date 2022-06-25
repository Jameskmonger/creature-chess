import { createAction } from "@reduxjs/toolkit";

import {
	LobbyServerToClient,
	GameServerToClient,
} from "@creature-chess/networking";

export type LobbyConnectedEvent = ReturnType<typeof lobbyConnectedEvent>;
export const lobbyConnectedEvent = createAction<
	LobbyServerToClient.LobbyConnectionPacket,
	"lobbyConnectedEvent"
>("lobbyConnectedEvent");

export type GameConnectedEvent = ReturnType<typeof gameConnectedEvent>;
export const gameConnectedEvent = createAction<
	GameServerToClient.GameConnectionPacket,
	"gameConnectedEvent"
>("gameConnectedEvent");
