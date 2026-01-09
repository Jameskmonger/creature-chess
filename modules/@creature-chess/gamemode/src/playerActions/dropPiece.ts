import { createAction } from "@reduxjs/toolkit";
import { takeEvery, put } from "redux-saga/effects";
import { select, getContext } from "typed-redux-saga";

import { GamePhase, PlayerPieceLocation } from "@creature-chess/models";

import { PlayerState } from "../entities/player";
import { getBoardSlice, getBenchSlice } from "../entities/player/selectors";
import { addBenchPieceCommand, addBoardPieceCommand, moveBenchPieceCommand, moveBoardPieceCommand, removeBenchPieceCommand, removeBoardPieceCommand } from "../entities/player/state/board";
import { Board } from "@creature-chess/board";
import { getPlayerBelowPieceLimit } from "../entities/player/state/selectors";

export const findPiece = (
	board: Board,
	bench: Board,
	location: PlayerPieceLocation
) => {
	if (location.type === "board") {
		const { x, y } = location.location;

		return board.getPieceIdAtPosition(x, y);
	}

	if (location.type === "bench") {
		const { x } = location.location;

		return bench.getPieceIdAtPosition(x, 0);
	}

	return null;
};

export const isLocationLocked = (
	state: PlayerState,
	location: PlayerPieceLocation
) => {
	if (location.type === "board") {
		return state.roundInfo.phase !== GamePhase.PREPARING;
	}

	if (location.type === "bench") {
		return false;
	}

	return true;
};

export type DropPiecePlayerAction = ReturnType<typeof dropPiecePlayerAction>;
export const dropPiecePlayerAction = createAction<{
	pieceId: string;
	to: PlayerPieceLocation;
	from: PlayerPieceLocation;
}>("dropPiecePlayerAction");

export const dropPiecePlayerActionSaga = function*() {
	const boardSlice = yield* getBoardSlice();
	const benchSlice = yield* getBenchSlice();

	yield takeEvery<DropPiecePlayerAction>(
		dropPiecePlayerAction.toString(),
		function*({ payload: { from, pieceId, to } }) {
			const playerId = yield* getContext<string>("id");
			const state = yield* select((s: PlayerState) => s);

			if (isLocationLocked(state, from) || isLocationLocked(state, to)) {
				// source or destination is locked
				return;
			}

			const fromPieceId = findPiece(boardSlice, benchSlice, from);

			if (fromPieceId === null || fromPieceId !== pieceId) {
				// from piece not found or id wrong (position mismatch?)
				return;
			}

			const toPieceId = findPiece(boardSlice, benchSlice, to);

			if (toPieceId !== null) {
				// destination tile not empty
				return;
			}

			if (to.type === "board" && from.type !== "board") {
				const belowPieceLimit = getPlayerBelowPieceLimit(state.playerInfo.level, boardSlice, benchSlice);

				if (!belowPieceLimit) {
					return;
				}
			}

			if (from.type === "board" && to.type === "board") {
				yield put(
					moveBoardPieceCommand({
						pieceId,
						from: from.location,
						to: to.location,
					})
				);
			} else if (from.type === "bench" && to.type === "bench") {
				const fromBench = { x: from.location.x, y: 0 };
				const toBench = { x: to.location.x, y: 0 };

				yield put(
					moveBenchPieceCommand({
						pieceId,
						from: fromBench,
						to: toBench,
					})
				);
			} else if (from.type === "board" && to.type === "bench") {
				yield put(removeBoardPieceCommand({ pieceId }));
				yield put(
					addBenchPieceCommand({
						pieceId,
						position: { x: to.location.x },
					})
				);
			} else if (from.type === "bench" && to.type === "board") {
				yield put(removeBenchPieceCommand({ pieceId }));
				yield put(
					addBoardPieceCommand({
						pieceId,
						position: { x: to.location.x, y: to.location.y },
					})
				);
			}
		}
	);
};
