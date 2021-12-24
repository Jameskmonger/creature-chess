import { BoardState } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MatchState = {
	board: BoardState<PieceModel> | null;
};

const initialState: MatchState = { board: null };

export const { reducer: matchReducer, actions: { setMatchBoard } } = createSlice({
	name: "match",
	initialState,
	reducers: {
		setMatchBoard: (state, { payload: board }: PayloadAction<BoardState<PieceModel> | null>) => ({ ...state, board })
	}
});
