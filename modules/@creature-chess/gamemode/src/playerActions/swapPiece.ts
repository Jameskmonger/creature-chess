import { createAction } from "@reduxjs/toolkit";

import { unpackX } from "@creature-chess/board";
import { PlayerPieceLocation } from "@creature-chess/models";

import { PlayerStartListening } from "../entities/player/player";
import { PlayerState } from "../entities/player/state";
import { findPiece, isLocationLocked } from "./dropPiece";

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = createAction<{
	pieceAId: string;
	pieceALocation: PlayerPieceLocation;
	pieceBId: string;
	pieceBLocation: PlayerPieceLocation;
}>("swapPiecePlayerAction");

export const setupSwapPieceListener = (
	startListening: PlayerStartListening
) => {
	startListening({
		actionCreator: swapPiecePlayerAction,
		effect: async (
			{ payload: { pieceAId, pieceALocation, pieceBId, pieceBLocation } },
			api
		) => {
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
				api.player.swapBoardPieces({
					pieceIdA: pieceAId,
					pieceIdB: pieceBId,
				});
			} else if (
				pieceALocation.type === "bench" &&
				pieceBLocation.type === "bench"
			) {
				api.player.swapBenchPieces({
					pieceIdA: pieceAId,
					pieceIdB: pieceBId,
				});
			} else if (
				pieceALocation.type === "board" &&
				pieceBLocation.type === "bench"
			) {
				api.player.removeBoardPiece({ pieceId: pieceAId });
				api.player.removeBenchPiece({ pieceId: pieceBId });
				api.player.addBoardPiece({
					pieceId: pieceBId,
					position: pieceALocation.location,
				});
				api.player.addBenchPiece({
					pieceId: pieceAId,
					position: { x: unpackX(pieceBLocation.location) },
				});
			} else if (
				pieceALocation.type === "bench" &&
				pieceBLocation.type === "board"
			) {
				api.player.removeBoardPiece({ pieceId: pieceBId });
				api.player.removeBenchPiece({ pieceId: pieceAId });
				api.player.addBoardPiece({
					pieceId: pieceAId,
					position: pieceBLocation.location,
				});
				api.player.addBenchPiece({
					pieceId: pieceBId,
					position: { x: unpackX(pieceALocation.location) },
				});
			}
		},
	});
};
