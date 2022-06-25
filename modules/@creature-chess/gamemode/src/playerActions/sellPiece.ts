import { createAction } from "@reduxjs/toolkit";
import { takeEvery, select, put } from "redux-saga/effects";

import { PieceModel } from "@creature-chess/models";

import { afterSellPieceEvent } from "../entities/player/events";
import { getBoardSlice, getBenchSlice } from "../entities/player/selectors";
import { updateMoneyCommand } from "../entities/player/state/commands";
import { getPiece } from "../player/pieceSelectors";

export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;
export const sellPiecePlayerAction = createAction<{ pieceId: string }>(
	"sellPiecePlayerAction"
);

const PIECES_FOR_STAGE = [1, 3, 9];

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

			const piecesUsed = PIECES_FOR_STAGE[piece.stage];
			const pieceCost = piece.definition.cost;
			const currentMoney: number = yield select(
				(state) => state.playerInfo.money
			);

			yield put(updateMoneyCommand(currentMoney + pieceCost * piecesUsed));

			yield put(benchSlice.commands.removeBoardPiecesCommand([pieceId]));
			yield put(boardSlice.commands.removeBoardPiecesCommand([pieceId]));

			yield put(afterSellPieceEvent({ piece }));
		}
	);
};
