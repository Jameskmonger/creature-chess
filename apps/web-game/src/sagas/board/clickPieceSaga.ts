import { take, select, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { AppState } from "~/store";
import { UIActions } from "~/store/game/ui";
import { clearSelectedPiece } from "~/store/game/ui/actions";
import { getLocationForPiece } from "~/utils/getLocationForPiece";

import { PlayerActions } from "@creature-chess/gamemode";
import { GameBoardState } from "~/components/game/board/state";
import { getContext } from "typed-redux-saga";

export type PlayerClickPieceAction = ReturnType<typeof playerClickPieceAction>;
export const playerClickPieceAction = createAction<{ pieceId: string }>(
	"playerClickPieceAction"
);

export const clickPieceSaga = function*() {
	const slices = yield* getContext<GameBoardState>("slices");

	while (true) {
		const action: PlayerClickPieceAction = yield take(
			playerClickPieceAction.toString()
		);

		const { pieceId } = action.payload;

		const pieceLocation = getLocationForPiece(pieceId, slices.board, slices.bench);

		if (!pieceLocation) {
			// couldnt find position
			// todo maybe log it?
			continue;
		}

		const selectedPieceId: string | null = yield select((state: AppState) =>
			state.game.ui.selectedPieceId
		);

		// swap the pieces if there's one selected, otherwise select it
		if (selectedPieceId) {
			const selectedPieceLocation = getLocationForPiece(
				selectedPieceId,
				slices.board,
				slices.bench
			);

			if (!selectedPieceLocation) {
				// piece doesn't exist should never happen
				// todo maybe log it?
				continue;
			}

			if (!pieceLocation) {
				continue;
			}

			yield put(
				PlayerActions.swapPiecePlayerAction({
					pieceAId: selectedPieceId,
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
