import { ClientUi, GameEvents } from "@creature-chess/models";
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
		selectPiece: (state, { payload: id }: PayloadAction<string>) => {
			const isSamePiece =
				state.selectedPieceId !== null && state.selectedPieceId === id;

			state.selectedPieceId = isSamePiece ? null : id;
		},
		clearSelectedPiece: (state) => {
			state.selectedPieceId = null;
		},
		setInGameCommand: (state) => {
			state.inGame = true;
		},
		setConnectionStatusCommand: (
			state,
			{ payload }: PayloadAction<ConnectionStatus>
		) => {
			state.connectionStatus = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(ClientUi.openOverlayCommand, (state, { payload }) => {
			state.currentOverlay = payload;
		});
		builder.addCase(ClientUi.closeOverlayCommand, (state, { payload }) => {
			if (payload === undefined || state.currentOverlay === payload) {
				state.currentOverlay = null;
			}
		});
		builder.addCase(GameEvents.gameFinishEvent, (state, action) => {
			const winner = action.payload.players.find((p) => p.position === 1);
			if (winner) {
				state.winnerId = winner.id;
			}
		});
	},
});

export const { reducer } = uiSlice;
