import { createAction } from "@reduxjs/toolkit";
import { takeEvery, select, put } from "redux-saga/effects";

import { PieceModel } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models/config";

import { afterSellPieceEvent } from "../entities/player/events";
import { getBoardSlice, getBenchSlice } from "../entities/player/selectors";
import { playerInfoCommands } from "../entities/player/state/commands";
import { getPiecesForStage } from "../game/evolution";
import { removeBenchPieceCommand, removeBoardPieceCommand } from "../entities/player/state/board";
import { getPlayerEntityDependencies } from "../entities/player/dependencies";

export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;
export const sellPiecePlayerAction = createAction<{ pieceId: string }>(
	"sellPiecePlayerAction"
);

export const sellPiecePlayerActionSaga = function*() {
	const {
		boardSlices: { boardSlice, benchSlice },
		gamemode: { pieceRegistry }
	} = yield* getPlayerEntityDependencies();

	yield takeEvery<SellPiecePlayerAction>(
		sellPiecePlayerAction.toString(),
		function*({ payload: { pieceId } }) {
			const ownsPiece = boardSlice.containsPiece(pieceId) || benchSlice.containsPiece(pieceId);

			if (!ownsPiece) {
				// console.log(`Attempted to sell piece with id ${pieceId} but did not own it`);
				return;
			}

			const piece = pieceRegistry.getPieceById(pieceId);

			if (!piece) {
				// console.log(`Attempted to sell piece with id ${pieceId} but could not find it in registry`);
				return;
			}

			const piecesUsed = getPiecesForStage(piece.stage, PIECES_TO_EVOLVE);
			const pieceCost = piece.definition.cost;
			const currentMoney: number = yield select(
				(state) => state.playerInfo.money
			);

			// TODO (Jameskmonger) this possibly isn't safe.. can the money be updated
			// 			in between the `select` and the `put`?
			yield put(
				playerInfoCommands.updateMoneyCommand(
					currentMoney + pieceCost * piecesUsed
				)
			);

			// todo gross, only remove from one
			yield put(removeBoardPieceCommand({ pieceId }));
			yield put(removeBenchPieceCommand({ pieceId }));

			yield put(afterSellPieceEvent({ piece }));
		}
	);
};
