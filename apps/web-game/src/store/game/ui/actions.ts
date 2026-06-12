import { ClientUi } from "@creature-chess/models";

import { uiSlice } from "./reducer";

export const openOverlay = ClientUi.openOverlayCommand;
export const closeOverlay = ClientUi.closeOverlayCommand;

export const {
	selectPiece,
	clearSelectedPiece,
	setInGameCommand,
	setConnectionStatusCommand,
} = uiSlice.actions;

export type SetInGameCommand = ReturnType<typeof setInGameCommand>;
