import { createAction } from "@reduxjs/toolkit";
import { takeEvery, put } from "redux-saga/effects";
import { select, getContext } from "typed-redux-saga";

import { BoardSelectors } from "@shoki/board";

import { PlayerPieceLocation } from "@creature-chess/models";

import { PlayerState } from "../entities/player";
import { getBoardSlice, getBenchSlice } from "../entities/player/selectors";
import { getPlayerBelowPieceLimit } from "../entities/player/state/selectors";

export const findPiece = (
	state: PlayerState,
	location: PlayerPieceLocation
) => {
	if (location.type === "board") {
		const { x, y } = location.location;

		return BoardSelectors.getPieceForPosition(state.board, x, y);
	}

	if (location.type === "bench") {
		const { x } = location.location;

		return BoardSelectors.getPieceForPosition(state.bench, x, 0);
	}

	return null;
};

export const isLocationLocked = (
	state: PlayerState,
	location: PlayerPieceLocation
) => {
	if (location.type === "board") {
		return state.board.locked;
	}

	if (location.type === "bench") {
		return state.bench.locked;
	}

	return true;
};

export type DropPiecePlayerAction = ReturnType<typeof dropPiecePlayerAction>;
export const dropPiecePlayerAction = createAction<{
	pieceId: string;
	to: PlayerPieceLocation;
	from: PlayerPieceLocation;
}>("dropPiecePlayerAction");

export const dropPiecePlayerActionSaga = function* () {
	const boardSlice = yield* getBoardSlice();
	const benchSlice = yield* getBenchSlice();

	yield takeEvery<DropPiecePlayerAction>(
		dropPiecePlayerAction.toString(),
		function* ({ payload: { from, pieceId, to } }) {
			const playerId = yield* getContext<string>("id");
			const state = yield* select((s: PlayerState) => s);

			if (isLocationLocked(state, from) || isLocationLocked(state, to)) {
				// source or destination is locked
				return;
			}

			const fromPiece = findPiece(state, from);

			if (fromPiece === null || fromPiece.id !== pieceId) {
				// from piece not found or id wrong (position mismatch?)
				return;
			}

			const toPiece = findPiece(state, to);

			if (toPiece !== null) {
				// destination tile not empty
				return;
			}

			if (to.type === "board" && from.type !== "board") {
				const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);

				if (!belowPieceLimit) {
					return;
				}
			}

			if (from.type === "board" && to.type === "board") {
				yield put(
					boardSlice.commands.moveBoardPieceCommand({
						pieceId,
						from: from.location,
						to: to.location,
					})
				);
			} else if (from.type === "bench" && to.type === "bench") {
				const fromBench = { x: from.location.x, y: 0 };
				const toBench = { x: to.location.x, y: 0 };

				yield put(
					benchSlice.commands.moveBoardPieceCommand({
						pieceId,
						from: fromBench,
						to: toBench,
					})
				);
			} else if (from.type === "board" && to.type === "bench") {
				yield put(boardSlice.commands.removeBoardPiecesCommand([pieceId]));
				yield put(
					benchSlice.commands.addBoardPieceCommand({
						piece: {
							...fromPiece,
							facingAway: false,
						},
						x: to.location.x,
						y: 0,
					})
				);
			} else if (from.type === "bench" && to.type === "board") {
				yield put(benchSlice.commands.removeBoardPiecesCommand([pieceId]));
				const { x, y } = to.location;
				yield put(
					boardSlice.commands.addBoardPieceCommand({
						piece: {
							...fromPiece,
							facingAway: true,
						},
						x,
						y,
					})
				);
			}
		}
	);
};
