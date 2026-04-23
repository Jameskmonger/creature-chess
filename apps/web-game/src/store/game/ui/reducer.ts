import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionStatus } from "~/networking/types";

import { Overlay } from "./overlay";

export interface UiState {
	inGame: boolean;
	connectionStatus: ConnectionStatus;
	selectedPieceId: string | null;
	currentOverlay: Overlay | null;
	winnerId: string | null;
}

const initialState: UiState = {
	inGame: false,
	currentOverlay: null,
	selectedPieceId: null,
	winnerId: null,
	connectionStatus: ConnectionStatus.NOT_CONNECTED,
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		openOverlay: (state, { payload }: PayloadAction<Overlay>) => {
			state.currentOverlay = payload;
		},
		closeOverlay: (state) => {
			state.currentOverlay = null;
		},
		selectPiece: (state, { payload: id }: PayloadAction<string>) => {
			const isSamePiece =
				state.selectedPieceId !== null && state.selectedPieceId === id;

			state.selectedPieceId = isSamePiece ? null : id;
		},
		clearSelectedPiece: (state) => {
			state.selectedPieceId = null;
		},
		setWinnerIdCommand: (
			state,
			{ payload }: PayloadAction<{ winnerId: string }>
		) => {
			state.winnerId = payload.winnerId;
		},
		setInGameCommand: (state) => {
			state.inGame = true;
		},
	},
});

export const { reducer } = uiSlice;
