import { createAction } from "@reduxjs/toolkit";

import { PlayerPieceLocation } from "@creature-chess/models";

import { PlayerStartListening } from "../entities/player/player";
import { PlayerState } from "../entities/player/state";
import { findPiece, isLocationLocked } from "./dropPiece";
import {
	addBenchPieceCommand,
	addBoardPieceCommand,
	removeBenchPieceCommand,
	removeBoardPieceCommand,
	swapBenchPiecesCommand,
	swapBoardPiecesCommand,
} from "../entities/player/state/board";
import { unpackX } from "@creature-chess/board";

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = createAction<{
	pieceAId: string;
	pieceALocation: PlayerPieceLocation;
	pieceBId: string;
	pieceBLocation: PlayerPieceLocation;
}>("swapPiecePlayerAction");

export const setupSwapPieceListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: swapPiecePlayerAction,
		effect: async ({ payload: { pieceAId, pieceALocation, pieceBId, pieceBLocation } }, api) => {
			const { board, bench } = api.player;
			const state = api.getState();

			if (
				isLocationLocked(state, pieceALocation) ||
				isLocationLocked(state, pieceBLocation)
			) {
				return;
			}

			const foundPieceAId = findPiece(board, bench, pieceALocation);

			if (!foundPieceAId || foundPieceAId !== pieceAId) {
				return;
			}

			const foundPieceBId = findPiece(board, bench, pieceBLocation);

			if (!foundPieceBId || foundPieceBId !== pieceBId) {
				return;
			}

			if (pieceALocation.type === "board" && pieceBLocation.type === "board") {
				api.dispatch(swapBoardPiecesCommand({ pieceIdA: pieceAId, pieceIdB: pieceBId }));
			} else if (
				pieceALocation.type === "bench" &&
				pieceBLocation.type === "bench"
			) {
				api.dispatch(swapBenchPiecesCommand({ pieceIdA: pieceAId, pieceIdB: pieceBId }));
			} else if (
				pieceALocation.type === "board" &&
				pieceBLocation.type === "bench"
			) {
				api.dispatch(removeBoardPieceCommand({ pieceId: pieceAId }));
				api.dispatch(removeBenchPieceCommand({ pieceId: pieceBId }));

				api.dispatch(addBoardPieceCommand({
					pieceId: pieceBId,
					position: pieceALocation.location,
				}));

				api.dispatch(addBenchPieceCommand({
					pieceId: pieceAId,
					position: {
						x: unpackX(pieceBLocation.location),
					}
				}));
			} else if (
				pieceALocation.type === "bench" &&
				pieceBLocation.type === "board"
			) {
				api.dispatch(removeBoardPieceCommand({ pieceId: pieceBId }));
				api.dispatch(removeBenchPieceCommand({ pieceId: pieceAId }));

				api.dispatch(addBoardPieceCommand({
					pieceId: pieceAId,
					position: pieceBLocation.location,
				}));

				api.dispatch(addBenchPieceCommand({
					pieceId: pieceBId,
					position: {
						x: unpackX(pieceALocation.location),
					}
				}));
			}
		},
	});
};
