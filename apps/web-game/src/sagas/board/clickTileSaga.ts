import { take, select, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { AppState } from "~/store";
import { clearSelectedPiece } from "~/store/game/ui";
import { getLocationForPiece } from "~/utils/getLocationForPiece";


import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";
import { getContext } from "typed-redux-saga";
import { GameBoardState } from "~/components/game/board/state";

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

		if (!selectedPieceId) {
			continue;
		}

		let tileEmpty = false;

		const piecePositionKey = `${tile.location.x},${tile.location.y}`;

		if (tile.type === "bench") {
			tileEmpty = slices.bench.getPieceIdAtPosition(tile.location.x, tile.location.y) === null;
		} else if (tile.type === "board") {
			tileEmpty = slices.board.getPieceIdAtPosition(tile.location.x, tile.location.y) === null;
		}

		if (!tileEmpty) {
			// click raised for non-empty tile, should never happen
			// todo maybe log it?
			continue;
		}

		const from = getLocationForPiece(selectedPieceId, slices.board, slices.bench);

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
