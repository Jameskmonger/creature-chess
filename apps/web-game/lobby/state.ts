import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LobbyPlayer } from "@creature-chess/models/lobby";
import { GamemodeSettings } from "@creature-chess/models/settings";
import { LobbyServerToClient } from "@creature-chess/networking";

/**
 * TODO this code is duplicated in @cc-web, see LobbyPageContext
 */
export type LobbyState = {
	players: LobbyPlayer[];
	startingAtMs: number;
	maxPlayers: number;
	lobbyWaitTimeSeconds: number;
	settings: GamemodeSettings;
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
			settings: action.payload.settings,
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
		updateSettings: (
			state,
			action: PayloadAction<LobbyServerToClient.LobbySettingsUpdatePacket>
		) => {
			if (!state) {
				return state;
			}

			return {
				...state,
				settings: action.payload.settings,
			};
		},
	},
});
