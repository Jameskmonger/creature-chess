import { take, select, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import { BoardState } from "@shoki/board";

import { getPiece, PlayerActions } from "@creature-chess/gamemode";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";

import { AppState } from "../../../store";
import { clearSelectedPiece } from "../../ui/actions";
import { getLocationForPiece } from "../getLocationForPiece";

export type PlayerClickTileAction = ReturnType<typeof playerClickTileAction>;
export const playerClickTileAction = createAction<{
	tile: PlayerPieceLocation;
}>("playerClickTileAction");

export const clickTileSaga = function* () {
	while (true) {
		const action: PlayerClickTileAction = yield take(
			playerClickTileAction.toString()
		);

		const { tile } = action.payload;

		const selectedPiece: PieceModel = yield select((state: AppState) =>
			state.game.ui.selectedPieceId
				? getPiece(state.game, state.game.ui.selectedPieceId)
				: null
		);

		if (!selectedPiece) {
			continue;
		}

		let tileEmpty = false;
		const board: BoardState = yield select(
			(state: AppState) => state.game.board
		);
		const bench: BoardState = yield select(
			(state: AppState) => state.game.bench
		);

		const piecePositionKey = `${tile.location.x},${tile.location.y}`;

		if (tile.type === "bench") {
			tileEmpty = !bench.piecePositions[piecePositionKey];
		} else if (tile.type === "board") {
			tileEmpty = !board.piecePositions[piecePositionKey];
		}

		if (!tileEmpty) {
			// click raised for non-empty tile, should never happen
			// todo maybe log it?
			continue;
		}

		const from = getLocationForPiece(selectedPiece.id, board, bench);

		if (!from) {
			// couldnt find position
			// todo maybe log it?
			continue;
		}

		yield put(
			PlayerActions.dropPiecePlayerAction({
				pieceId: selectedPiece.id,
				from,
				to: tile,
			})
		);

		yield put(clearSelectedPiece());
	}
};
