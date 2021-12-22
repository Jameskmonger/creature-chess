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
		connectToLobby: (state, action: PayloadAction<LobbyServerToClient.LobbyConnectionPacket>) => ({
			...state,
			players: action.payload.players,
			startingAtMs: action.payload.startTimestamp
		}),
		updatePlayers: (state, action: PayloadAction<LobbyServerToClient.LobbyUpdatePacket>) => ({
			...state,
			players: action.payload.players,
		}),
	}
});
