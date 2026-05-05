import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { unpackX } from "@creature-chess/board";

import {
	findPiece,
	isLocationLocked,
	pieceLocationSchema,
} from "./pieceLocation";
import { definePlayerAction } from "./registry";

const swapPieceSchema = z.object({
	pieceAId: z.string(),
	pieceALocation: pieceLocationSchema,
	pieceBId: z.string(),
	pieceBLocation: pieceLocationSchema,
});

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = createAction<
	z.infer<typeof swapPieceSchema>
>("swapPiecePlayerAction");

export const swapPieceDef = definePlayerAction({
	type: swapPiecePlayerAction.type,
	schema: swapPieceSchema,
	handler: (
		player,
		{ pieceAId, pieceALocation, pieceBId, pieceBLocation }
	) => {
		const { board, bench } = player;

		if (
			isLocationLocked(player.boardLocked, pieceALocation) ||
			isLocationLocked(player.boardLocked, pieceBLocation)
		) {
			return;
		}

		if (findPiece(board, bench, pieceALocation) !== pieceAId) {
			return;
		}
		if (findPiece(board, bench, pieceBLocation) !== pieceBId) {
			return;
		}

		if (pieceALocation.type === "board" && pieceBLocation.type === "board") {
			player.swapBoardPieces({ pieceIdA: pieceAId, pieceIdB: pieceBId });
		} else if (
			pieceALocation.type === "bench" &&
			pieceBLocation.type === "bench"
		) {
			player.swapBenchPieces({ pieceIdA: pieceAId, pieceIdB: pieceBId });
		} else if (
			pieceALocation.type === "board" &&
			pieceBLocation.type === "bench"
		) {
			player.removeBoardPiece({ pieceId: pieceAId });
			player.removeBenchPiece({ pieceId: pieceBId });
			player.addBoardPiece({
				pieceId: pieceBId,
				position: pieceALocation.location,
			});
			player.addBenchPiece({
				pieceId: pieceAId,
				position: { x: unpackX(pieceBLocation.location) },
			});
		} else if (
			pieceALocation.type === "bench" &&
			pieceBLocation.type === "board"
		) {
			player.removeBoardPiece({ pieceId: pieceBId });
			player.removeBenchPiece({ pieceId: pieceAId });
			player.addBoardPiece({
				pieceId: pieceAId,
				position: pieceBLocation.location,
			});
			player.addBenchPiece({
				pieceId: pieceBId,
				position: { x: unpackX(pieceALocation.location) },
			});
		}
	},
});
