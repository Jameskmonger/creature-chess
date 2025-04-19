import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LobbyServerToClient } from "@creature-chess/networking";

export type LobbyState = LobbyServerToClient.LobbyConnectionPacket | null;

const initialState = null as LobbyState | null;

export const { reducer: lobbyReducer, actions: LobbyCommands } = createSlice({
	name: "lobby",
	initialState,
	reducers: {
		connectToLobby: (
			state,
			action: PayloadAction<LobbyServerToClient.LobbyConnectionPacket>
		) => ({
			...action.payload,
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
