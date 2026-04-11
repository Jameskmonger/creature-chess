import { createAction } from "@reduxjs/toolkit";

import { Board, unpackPosition, unpackX } from "@creature-chess/board";
import { GamePhase, PlayerPieceLocation } from "@creature-chess/models";

import { PlayerStartListening } from "../entities/player/player";
import { PlayerState } from "../entities/player/state";
import {
	addBenchPieceCommand,
	addBoardPieceCommand,
	moveBenchPieceCommand,
	moveBoardPieceCommand,
	removeBenchPieceCommand,
	removeBoardPieceCommand,
} from "../entities/player/state/board";
import { getPlayerBelowPieceLimit } from "../entities/player/state/selectors";

export const findPiece = (
	board: Board,
	bench: Board,
	location: PlayerPieceLocation
) => {
	if (location.type === "board") {
		const [x, y] = unpackPosition(location.location);

		return board.getPieceIdAtPosition(x, y);
	}

	if (location.type === "bench") {
		const x = unpackX(location.location);

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

export const setupDropPieceListener = (
	startListening: PlayerStartListening
) => {
	startListening({
		actionCreator: dropPiecePlayerAction,
		effect: async ({ payload: { from, pieceId, to } }, api) => {
			const { logger, board, bench } = api.player;
			const state = api.getState();

			if (isLocationLocked(state, from)) {
				return;
			}

			if (isLocationLocked(state, to)) {
				return;
			}

			const fromPieceId = findPiece(board, bench, from);

			if (fromPieceId === null) {
				return;
			}

			if (fromPieceId !== pieceId) {
				return;
			}

			const toPieceId = findPiece(board, bench, to);

			if (toPieceId !== null) {
				return;
			}

			if (to.type === "board" && from.type !== "board") {
				const belowPieceLimit = getPlayerBelowPieceLimit(
					state.playerInfo.level,
					board
				);

				if (!belowPieceLimit) {
					return;
				}
			}

			if (from.type === "board" && to.type === "board") {
				api.dispatch(
					moveBoardPieceCommand({
						pieceId,
						from: from.location,
						to: to.location,
					})
				);
			} else if (from.type === "bench" && to.type === "bench") {
				const fromBench = { x: unpackX(from.location), y: 0 };
				const toBench = { x: unpackX(to.location), y: 0 };

				api.dispatch(
					moveBenchPieceCommand({
						pieceId,
						from: fromBench,
						to: toBench,
					})
				);
			} else if (from.type === "board" && to.type === "bench") {
				api.dispatch(removeBoardPieceCommand({ pieceId }));
				api.dispatch(
					addBenchPieceCommand({
						pieceId,
						position: { x: unpackX(to.location) },
					})
				);
			} else if (from.type === "bench" && to.type === "board") {
				api.dispatch(removeBenchPieceCommand({ pieceId }));
				api.dispatch(
					addBoardPieceCommand({
						pieceId,
						position: to.location,
					})
				);
			}
		},
	});
};
