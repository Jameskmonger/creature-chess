import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyPlayer } from "@creature-chess/models";
import { LobbyServerToClient } from "@creature-chess/networking";

export type LobbyState = {
	lobbyId: string;
	players: LobbyPlayer[];
	startingAtMs: number;
};

const initialState: LobbyState = {
	lobbyId: null,
	players: [],
	startingAtMs: null
};

export const { reducer, actions: LobbyCommands } = createSlice({
	name: "lobby",
	initialState,
	reducers: {
		setLobbyDetailsCommand: (state, action: PayloadAction<LobbyServerToClient.LobbyConnectionPacket>) => ({
			...state,
			lobbyId: action.payload.lobbyId,
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
