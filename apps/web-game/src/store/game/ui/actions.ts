import { uiSlice } from "./reducer";

export const {
	openOverlay,
	closeOverlay,
	selectPiece,
	clearSelectedPiece,
	setInGameCommand,
	setConnectionStatusCommand,
} = uiSlice.actions;

export type SetInGameCommand = ReturnType<typeof setInGameCommand>;
