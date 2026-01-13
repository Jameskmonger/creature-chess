import { take, select, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { AppState } from "~/store";
import { clearSelectedPiece } from "~/store/game/ui";
import { getLocationForPiece } from "~/utils/getLocationForPiece";


import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";
import { getContext } from "typed-redux-saga";
import { GameBoardState } from "~/components/game/board/state";
import { unpackPosition } from "@creature-chess/board";

export type PlayerClickTileAction = ReturnType<typeof playerClickTileAction>;
export const playerClickTileAction = createAction<{
	tile: PlayerPieceLocation;
}>("playerClickTileAction");

export const clickTileSaga = function*() {
	const slices = yield* getContext<GameBoardState>("slices");

	while (true) {
		const action: PlayerClickTileAction = yield take(
			playerClickTileAction.toString()
		);

		const { tile } = action.payload;

		const selectedPieceId: string | null = yield select((state: AppState) =>
			state.game.ui.selectedPieceId
		);

		console.log(`currently selected piece id:`, selectedPieceId);

		if (!selectedPieceId) {
			continue;
		}

		let tileEmpty = false;

		const [x, y] = unpackPosition(tile.location);

		if (tile.type === "bench") {
			tileEmpty = slices.bench.getPieceIdAtPosition(x, y) === null;
		} else if (tile.type === "board") {
			tileEmpty = slices.board.getPieceIdAtPosition(x, y) === null;
		}

		if (!tileEmpty) {
			// click raised for non-empty tile, should never happen
			// todo maybe log it?
			continue;
		}

		const from = getLocationForPiece(selectedPieceId, slices.board, slices.bench);

		console.log(`from position for piece ${selectedPieceId}:`, from);

		if (!from) {
			// couldnt find position
			// todo maybe log it?
			continue;
		}

		yield put(
			PlayerActions.dropPiecePlayerAction({
				pieceId: selectedPieceId,
				from,
				to: tile,
			})
		);

		yield put(clearSelectedPiece());
	}
};
