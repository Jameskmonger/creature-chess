import { createAction } from "@reduxjs/toolkit";
import { ConnectionStatus } from "../connection-status";
import { Overlay } from "./overlay";

export const OPEN_OVERLAY = "OPEN_OVERLAY";
export type OPEN_OVERLAY = typeof OPEN_OVERLAY;
export const CLOSE_OVERLAY = "CLOSE_OVERLAY";
export type CLOSE_OVERLAY = typeof CLOSE_OVERLAY;
export const UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
export type UPDATE_CONNECTION_STATUS = typeof UPDATE_CONNECTION_STATUS;

export type OpenOverlayAction = { type: OPEN_OVERLAY, payload: { overlay: Overlay } };
export type CloseOverlayAction = { type: CLOSE_OVERLAY };
export type UpdateConnectionStatusAction = ({ type: UPDATE_CONNECTION_STATUS, payload: { status: ConnectionStatus } });

export type SetWinnerIdCommand = ReturnType<typeof setWinnerIdCommand>;
export const setWinnerIdCommand = createAction<{ winnerId: string }, "setWinnerIdCommand">("setWinnerIdCommand");

export const SELECT_PIECE = "SELECT_PIECE";
export type SELECT_PIECE = typeof SELECT_PIECE;
export const CLEAR_SELECTED_PIECE = "CLEAR_SELECTED_PIECE";
export type CLEAR_SELECTED_PIECE = typeof CLEAR_SELECTED_PIECE;

export type SelectPieceAction = ({ type: SELECT_PIECE, payload: { id: string } });
export type ClearSelectedPieceAction = ({ type: CLEAR_SELECTED_PIECE });

export const selectPiece = (id: string): SelectPieceAction => ({
	type: SELECT_PIECE,
	payload: {
		id
	}
});

export const clearSelectedPiece = (): ClearSelectedPieceAction => ({ type: CLEAR_SELECTED_PIECE });

export const openOverlay = (overlay: Overlay): OpenOverlayAction => ({
	type: OPEN_OVERLAY,
	payload: {
		overlay
	}
});

export const closeOverlay = (): CloseOverlayAction => ({ type: CLOSE_OVERLAY });

export const updateConnectionStatus = (status: ConnectionStatus): UpdateConnectionStatusAction => ({
	type: UPDATE_CONNECTION_STATUS,
	payload: {
		status
	}
});
