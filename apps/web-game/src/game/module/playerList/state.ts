import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlayerListPlayer } from "@creature-chess/models";

const initialState: PlayerListPlayer[] = [];

export const { reducer, actions: commands } = createSlice({
	name: "playerlist",
	initialState,
	reducers: {
		updatePlayerListCommand: (
			state,
			{ payload: players }: PayloadAction<PlayerListPlayer[]>
		) => [...players],
	},
});
