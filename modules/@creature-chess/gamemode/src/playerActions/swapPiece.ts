import { createAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { select, take } from "typed-redux-saga";

import { PlayerPieceLocation } from "@creature-chess/models";

import { PlayerState } from "../entities/player";
import { getBoardSlice, getBenchSlice } from "../entities/player/selectors";
// todo move these into util functions
import { findPiece, isLocationLocked } from "./dropPiece";
import { addBenchPieceCommand, addBoardPieceCommand, removeBenchPieceCommand, removeBoardPieceCommand, swapBenchPiecesCommand, swapBoardPiecesCommand } from "../entities/player/state/board";

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = createAction<{
	pieceAId: string;
	pieceALocation: PlayerPieceLocation;
	pieceBId: string;
	pieceBLocation: PlayerPieceLocation;
}>("swapPiecePlayerAction");

export const swapPiecePlayerActionSaga = function*() {
	const boardSlice = yield* getBoardSlice();
	const benchSlice = yield* getBenchSlice();

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

		const foundPieceAId = findPiece(boardSlice, benchSlice, pieceALocation);

		if (!foundPieceAId || foundPieceAId !== pieceAId) {
			// piece A not found or id wrong (position mismatch?)
			// todo log
			continue;
		}

		const foundPieceBId = findPiece(boardSlice, benchSlice, pieceBLocation);

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
				position: {
					x: pieceALocation.location.x,
					y: pieceALocation.location.y,
				}
			}));

			yield put(addBenchPieceCommand({
				pieceId: pieceAId,
				position: {
					x: pieceBLocation.location.x,
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
				position: {
					x: pieceBLocation.location.x,
					y: pieceBLocation.location.y,
				}
			}));

			yield put(addBenchPieceCommand({
				pieceId: pieceBId,
				position: {
					x: pieceALocation.location.x,
				}
			}));
		}
	}
};
