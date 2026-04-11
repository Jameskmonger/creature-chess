import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlayerListPlayer } from "@creature-chess/models";

const initialState: PlayerListPlayer[] = [];

export const { reducer: playerListReducer, actions: PlayerListCommands } =
	createSlice({
		name: "playerlist",
		initialState,
		reducers: {
			updatePlayerListCommand: (
				state,
				{ payload: players }: PayloadAction<PlayerListPlayer[]>
			) => [...players],
		},
	});
