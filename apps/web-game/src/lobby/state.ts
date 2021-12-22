import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyPlayer } from "@creature-chess/models";
import { LobbyServerToClient } from "@creature-chess/networking";

export type LobbyState = {
	players: LobbyPlayer[];
	startingAtMs: number | null;
};

const initialState: LobbyState = {
	players: [],
	startingAtMs: null
};

export const { reducer, actions: LobbyCommands } = createSlice({
	name: "lobby",
	initialState,
	reducers: {
		setLobbyDetailsCommand: (state, action: PayloadAction<LobbyServerToClient.LobbyConnectionPacket>) => ({
			...state,
			players: action.payload.players,
			startingAtMs: action.payload.startTimestamp
		}),
		updateLobbyPlayerCommand: (state: LobbyState, action: PayloadAction<{ index: number; player: LobbyPlayer }>) => {
			const cloned = {
				...state,
				players: [
					...state.players
				]
			};

			cloned.players[action.payload.index] = action.payload.player;

			return cloned;
		}
	}
});
