import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Overlay {
	CARD_SELECTION,
	NOTIFICATION,
}
export enum BoardType {
	BOARD,
	BENCH,
}

export type UIState = {
	overlay: Overlay | null;
	boardParameters: {
		boardPosition: {
			one: number;
			two: number;
		};
		boardType: BoardType;
	} | null;
};

const initialState: UIState = {
	overlay: null,
	boardParameters: null,
};

interface BoardPosition {
	one: number;
	two: number;
}
export interface BoardParameters {
	boardPosition: BoardPosition;
	boardType: BoardType;
}

const { reducer, actions } = createSlice({
	name: "ui",
	initialState,
	reducers: {
		openCardSelectionOverlay: (
			state,
			{ payload: boardParameters }: PayloadAction<BoardParameters>
		) => ({
			overlay: Overlay.CARD_SELECTION,
			boardParameters: {
				boardPosition: boardParameters.boardPosition,
				boardType: boardParameters.boardType,
			},
		}),
		closeOverlay: (state) => ({
			...state,
			overlay: null,
		}),
	},
});

export { reducer as uiReducer, actions as uiActions };
