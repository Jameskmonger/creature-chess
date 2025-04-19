import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BoardSelectors, BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export type StatsState = Record<
	string,
	{
		damageDealt: number;
		damageTaken: number;
		turnsSurvived: number;
	}
>;

const initialState: StatsState = {};

export const {
	reducer: statsReducer,
	actions: { setStats },
} = createSlice({
	name: "stats",
	initialState,
	reducers: {
		setStats: (
			state,
			{ payload: board }: PayloadAction<BoardState<PieceModel> | null>
		) => {
			if (!board) {
				state = {};
				return;
			}

			for (const piece of BoardSelectors.getAllPieces(board)) {
				if (piece.lastBattleStats) {
					state[piece.id] = piece.lastBattleStats;
				}
			}
		},
	},
});
