import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyInfo } from "@creature-chess/ui";
import { LobbyServerToClient } from "@creature-chess/networking";

export type LobbyState = LobbyInfo | null;

const initialState = null as LobbyState;

export const { reducer, actions: LobbyCommands } = createSlice({
	name: "lobby",
	initialState,
	reducers: {
		connectToLobby: (state, action: PayloadAction<LobbyServerToClient.LobbyConnectionPacket>) => ({
			players: action.payload.players,
			startingAtMs: action.payload.startTimestamp
		}),
		updatePlayers: (state, action: PayloadAction<LobbyServerToClient.LobbyUpdatePacket>) => {
			if (!state) {
				return state;
			}

			return {
				...state,
				players: action.payload.players,
			};
		},
	}
});
