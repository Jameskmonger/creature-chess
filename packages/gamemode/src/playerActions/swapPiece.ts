import { createAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { select, getContext, take } from "typed-redux-saga";
import { PlayerPieceLocation } from "@creature-chess/models";
import { PlayerState } from "../entities/player";
import { getBoardSlice, getBenchSlice } from "../entities/player/selectors";

// todo move these into util functions
import { findPiece, isLocationLocked } from "./dropPiece";

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = createAction<{
	pieceAId: string; pieceALocation: PlayerPieceLocation;
	pieceBId: string; pieceBLocation: PlayerPieceLocation;
}>("swapPiecePlayerAction");

export const swapPiecePlayerActionSaga = function*() {
	const boardSlice = yield* getBoardSlice();
	const benchSlice = yield* getBenchSlice();

	while (true) {
		const {
			payload: { pieceAId, pieceALocation, pieceBId, pieceBLocation }
		} = yield* take<SwapPiecePlayerAction>(swapPiecePlayerAction.toString());

		const playerId = yield* getContext<string>("id");
		const state = yield* select((s: PlayerState) => s);

		if (isLocationLocked(state, pieceALocation) || isLocationLocked(state, pieceBLocation)) {
			// source or destination is locked
			return;
		}

		const pieceA = findPiece(state, pieceALocation);

		if (!pieceA || pieceA.id !== pieceAId) {
			// piece A not found or id wrong (position mismatch?)
			// todo log
			return;
		}

		const pieceB = findPiece(state, pieceBLocation);

		if (!pieceB || pieceB.id !== pieceBId) {
			// piece B not found or id wrong (position mismatch?)
			// todo log
			return;
		}

		if (pieceALocation.type === "board" && pieceBLocation.type === "board") {
			yield put(boardSlice.commands.swapPiecesCommand({ aId: pieceAId, bId: pieceBId }));
		} else if (pieceALocation.type === "bench" && pieceBLocation.type === "bench") {
			yield put(benchSlice.commands.swapPiecesCommand({ aId: pieceAId, bId: pieceBId }));
		} else if (pieceALocation.type === "board" && pieceBLocation.type === "bench") {
			yield put(boardSlice.commands.removeBoardPiecesCommand([pieceAId]));
			yield put(benchSlice.commands.removeBoardPiecesCommand([pieceBId]));

			yield put(boardSlice.commands.addBoardPieceCommand({
				piece: {
					...pieceB,
					facingAway: false
				},
				x: pieceALocation.location.x,
				y: pieceALocation.location.y
			}));

			yield put(benchSlice.commands.addBoardPieceCommand({
				piece: {
					...pieceA,
					facingAway: false
				},
				x: pieceBLocation.location.x,
				y: 0
			}));
		} else if (pieceALocation.type === "bench" && pieceBLocation.type === "board") {
			yield put(boardSlice.commands.removeBoardPiecesCommand([pieceBId]));
			yield put(benchSlice.commands.removeBoardPiecesCommand([pieceAId]));

			yield put(boardSlice.commands.addBoardPieceCommand({
				piece: {
					...pieceA,
					facingAway: false
				},
				x: pieceBLocation.location.x,
				y: pieceBLocation.location.y
			}));

			yield put(benchSlice.commands.addBoardPieceCommand({
				piece: {
					...pieceB,
					facingAway: false
				},
				x: pieceALocation.location.x,
				y: 0
			}));
		}
	}
};
