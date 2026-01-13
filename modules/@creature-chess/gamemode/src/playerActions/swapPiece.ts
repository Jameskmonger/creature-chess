import { createAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { select, take } from "typed-redux-saga";

import { PlayerPieceLocation } from "@creature-chess/models";

import { PlayerState } from "../entities/player";
import { getBoard, getBench } from "../entities/player/selectors";
// todo move these into util functions
import { findPiece, isLocationLocked } from "./dropPiece";
import { addBenchPieceCommand, addBoardPieceCommand, removeBenchPieceCommand, removeBoardPieceCommand, swapBenchPiecesCommand, swapBoardPiecesCommand } from "../entities/player/state/board";
import { unpackX } from "@creature-chess/board";

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = createAction<{
	pieceAId: string;
	pieceALocation: PlayerPieceLocation;
	pieceBId: string;
	pieceBLocation: PlayerPieceLocation;
}>("swapPiecePlayerAction");

export const swapPiecePlayerActionSaga = function*() {
	const board = yield* getBoard();
	const bench = yield* getBench();

	while (true) {
		const {
			payload: { pieceAId, pieceALocation, pieceBId, pieceBLocation },
		} = yield* take<SwapPiecePlayerAction>(swapPiecePlayerAction.toString());

		const state = yield* select((s: PlayerState) => s);

		if (
			isLocationLocked(state, pieceALocation) ||
			isLocationLocked(state, pieceBLocation)
		) {
			// source or destination is locked
			continue;
		}

		const foundPieceAId = findPiece(board, bench, pieceALocation);

		if (!foundPieceAId || foundPieceAId !== pieceAId) {
			// piece A not found or id wrong (position mismatch?)
			// todo log
			continue;
		}

		const foundPieceBId = findPiece(board, bench, pieceBLocation);

		if (!foundPieceBId || foundPieceBId !== pieceBId) {
			// piece B not found or id wrong (position mismatch?)
			// todo log
			continue;
		}

		if (pieceALocation.type === "board" && pieceBLocation.type === "board") {
			yield put(swapBoardPiecesCommand({ pieceIdA: pieceAId, pieceIdB: pieceBId }));
		} else if (
			pieceALocation.type === "bench" &&
			pieceBLocation.type === "bench"
		) {
			yield put(swapBenchPiecesCommand({ pieceIdA: pieceAId, pieceIdB: pieceBId }));
		} else if (
			pieceALocation.type === "board" &&
			pieceBLocation.type === "bench"
		) {
			yield put(removeBoardPieceCommand({ pieceId: pieceAId }));
			yield put(removeBenchPieceCommand({ pieceId: pieceBId }));

			yield put(addBoardPieceCommand({
				pieceId: pieceBId,
				position: pieceALocation.location,
			}));

			yield put(addBenchPieceCommand({
				pieceId: pieceAId,
				position: {
					x: unpackX(pieceBLocation.location),
				}
			}));
		} else if (
			pieceALocation.type === "bench" &&
			pieceBLocation.type === "board"
		) {
			yield put(removeBoardPieceCommand({ pieceId: pieceBId }));
			yield put(removeBenchPieceCommand({ pieceId: pieceAId }));

			yield put(addBoardPieceCommand({
				pieceId: pieceAId,
				position: pieceBLocation.location,
			}));

			yield put(addBenchPieceCommand({
				pieceId: pieceBId,
				position: {
					x: unpackX(pieceALocation.location),
				}
			}));
		}
	}
};
