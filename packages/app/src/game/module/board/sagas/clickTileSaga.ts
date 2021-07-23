import { take, select, put } from "@redux-saga/core/effects";
import { getPiece, PlayerActions } from "@creature-chess/gamemode";
import { BoardState, BoardSelectors } from "@shoki/board";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { AppState } from "../../../../store";
import { clearSelectedPiece } from "../../../ui/actions";
import { createAction } from "@reduxjs/toolkit";

// todo move this to a player selector
export const getLocationForPiece = (pieceId: string, board: BoardState, bench: BoardState): PlayerPieceLocation => {
	if (board) {
		const boardPiecePosition = BoardSelectors.getPiecePosition(board, pieceId);

		if (boardPiecePosition) {
			return {
				type: "board",
				location: boardPiecePosition
			};
		}
	}

	if (bench) {
		const benchPiecePosition = BoardSelectors.getPiecePosition(bench, pieceId);

		if (benchPiecePosition !== undefined) {
			return {
				type: "bench",
				location: benchPiecePosition
			};
		}
	}

	return null;
};

export type PlayerClickTileAction = ReturnType<typeof playerClickTileAction>;
export const playerClickTileAction = createAction<{ tile: PlayerPieceLocation }>("playerClickTileAction");

export const clickTileSaga = function*() {
	while (true) {
		const action: PlayerClickTileAction = yield take(playerClickTileAction.toString());

		const { tile } = action.payload;

		const selectedPiece: PieceModel = yield select(
			(state: AppState) => state.game.ui.selectedPieceId
				? getPiece(state.game, state.game.ui.selectedPieceId)
				: null
		);

		if (!selectedPiece) {
			continue;
		}

		let tileEmpty = false;
		const board: BoardState = yield select((state: AppState) => state.game.board);
		const bench: BoardState = yield select((state: AppState) => state.game.bench);

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

		const from: PlayerPieceLocation = getLocationForPiece(selectedPiece.id, board, bench);

		yield put(PlayerActions.dropPiecePlayerAction({
			pieceId: selectedPiece.id,
			from,
			to: tile
		}));

		yield put(clearSelectedPiece());
	}
};
