import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LobbyPlayer } from "@creature-chess/models/lobby";
import { LobbyServerToClient } from "@creature-chess/networking";

/**
 * TODO this code is duplicated in @cc-web, see LobbyPageContext
 */
export type LobbyState = {
	players: LobbyPlayer[];
	startingAtMs: number;
	maxPlayers: number;
	lobbyWaitTimeSeconds: number;
} | null;

const initialState = null as LobbyState;

export const { reducer, actions: LobbyCommands } = createSlice({
	name: "lobby",
	initialState,
	reducers: {
		connectToLobby: (
			state,
			action: PayloadAction<LobbyServerToClient.LobbyConnectionPacket>
		) => ({
			players: action.payload.players,
			startingAtMs: action.payload.startTimestamp,
			lobbyWaitTimeSeconds: action.payload.lobbyWaitTimeSeconds,
			maxPlayers: action.payload.maxPlayers,
		}),
		updatePlayers: (
			state,
			action: PayloadAction<LobbyServerToClient.LobbyUpdatePacket>
		) => {
			if (!state) {
				return state;
			}

			return {
				...state,
				players: action.payload.players,
			};
		},
	},
});
