import { take, select, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import { BoardState, BoardSelectors } from "@shoki/board";

import { getPiece, PlayerActions } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { AppState } from "../../../store";
import { UIActions } from "../../ui";
import { clearSelectedPiece } from "../../ui/actions";
import { getLocationForPiece } from "../getLocationForPiece";

export type PlayerClickPieceAction = ReturnType<typeof playerClickPieceAction>;
export const playerClickPieceAction = createAction<{ pieceId: string }>(
	"playerClickPieceAction"
);

export const clickPieceSaga = function* () {
	while (true) {
		const action: PlayerClickPieceAction = yield take(
			playerClickPieceAction.toString()
		);

		const { pieceId } = action.payload;

		const board: BoardState = yield select(
			(state: AppState) => state.game.board
		);
		const bench: BoardState = yield select(
			(state: AppState) => state.game.bench
		);

		const piece =
			BoardSelectors.getPiece(board, pieceId) ||
			BoardSelectors.getPiece(bench, pieceId) ||
			null;

		if (!piece) {
			// piece doesn't exist should never happen
			// todo maybe log it?
			continue;
		}

		const pieceLocation = getLocationForPiece(pieceId, board, bench);

		const selectedPiece: PieceModel = yield select((state: AppState) =>
			state.game.ui.selectedPieceId
				? getPiece(state.game, state.game.ui.selectedPieceId)
				: null
		);

		// swap the pieces if there's one selected, otherwise select it
		if (selectedPiece) {
			const selectedPieceLocation = getLocationForPiece(
				selectedPiece.id,
				board,
				bench
			);

			if (!selectedPieceLocation || !pieceLocation) {
				// piece doesn't exist should never happen
				// todo maybe log it?
				continue;
			}

			yield put(
				PlayerActions.swapPiecePlayerAction({
					pieceAId: selectedPiece.id,
					pieceALocation: selectedPieceLocation,
					pieceBId: pieceId,
					pieceBLocation: pieceLocation,
				})
			);

			yield put(clearSelectedPiece());
		} else {
			yield put(UIActions.selectPiece(pieceId));
		}
	}
};
