import { createAction } from "@reduxjs/toolkit";
import { takeEvery, select, put } from "redux-saga/effects";

import { PieceModel } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models/config";

import { afterSellPieceEvent } from "../entities/player/events";
import { getBoardSlice, getBenchSlice } from "../entities/player/selectors";
import { updateMoneyCommand } from "../entities/player/state/commands";
import { getPiecesForStage } from "../game/evolution";
import { getPiece } from "../player/pieceSelectors";

export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;
export const sellPiecePlayerAction = createAction<{ pieceId: string }>(
	"sellPiecePlayerAction"
);

export const sellPiecePlayerActionSaga = function* () {
	const boardSlice = yield* getBoardSlice();
	const benchSlice = yield* getBenchSlice();

	yield takeEvery<SellPiecePlayerAction>(
		sellPiecePlayerAction.toString(),
		function* ({ payload: { pieceId } }) {
			const piece: PieceModel = yield select((state) =>
				getPiece(state, pieceId)
			);

			if (!piece) {
				// console.log(`Attempted to sell piece with id ${pieceId} but did not own it`);
				return;
			}

			const piecesUsed = getPiecesForStage(piece.stage, PIECES_TO_EVOLVE);
			const pieceCost = piece.definition.cost;
			const currentMoney: number = yield select(
				(state) => state.playerInfo.money
			);

			// TODO (Jameskmonger) this possibly isn't safe.. can the money be updated
			// 			in between the `select` and the `put`?
			yield put(updateMoneyCommand(currentMoney + pieceCost * piecesUsed));

			yield put(benchSlice.commands.removeBoardPiecesCommand([pieceId]));
			yield put(boardSlice.commands.removeBoardPiecesCommand([pieceId]));

			yield put(afterSellPieceEvent({ piece }));
		}
	);
};
