import { uiSlice } from "./reducer";

export const {
	openOverlay,
	closeOverlay,
	selectPiece,
	clearSelectedPiece,
	setInGameCommand,
	setWinnerIdCommand,
} = uiSlice.actions;

export type SetInGameCommand = ReturnType<typeof setInGameCommand>;
export type SetWinnerIdCommand = ReturnType<typeof setWinnerIdCommand>;
