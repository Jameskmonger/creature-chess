import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { unpackX } from "@creature-chess/board";

import { getPlayerBelowPieceLimit } from "../entities/player/state/selectors";
import {
	findPiece,
	isLocationLocked,
	pieceLocationSchema,
} from "./pieceLocation";
import { definePlayerAction } from "./registry";

const dropPieceSchema = z.object({
	pieceId: z.string(),
	from: pieceLocationSchema,
	to: pieceLocationSchema,
});

export type DropPiecePlayerAction = ReturnType<typeof dropPiecePlayerAction>;
export const dropPiecePlayerAction = createAction<
	z.infer<typeof dropPieceSchema>
>("dropPiecePlayerAction");

export const dropPieceDef = definePlayerAction({
	type: dropPiecePlayerAction.type,
	schema: dropPieceSchema,
	handler: (player, { from, pieceId, to }) => {
		const { board, bench } = player;
		const state = player.select((s) => s);

		if (isLocationLocked(state, from) || isLocationLocked(state, to)) {
			return;
		}

		const fromPieceId = findPiece(board, bench, from);
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
			player.moveBoardPiece({ pieceId, from: from.location, to: to.location });
		} else if (from.type === "bench" && to.type === "bench") {
			player.moveBenchPiece({
				pieceId,
				from: { x: unpackX(from.location) },
				to: { x: unpackX(to.location) },
			});
		} else if (from.type === "board" && to.type === "bench") {
			player.removeBoardPiece({ pieceId });
			player.addBenchPiece({
				pieceId,
				position: { x: unpackX(to.location) },
			});
		} else if (from.type === "bench" && to.type === "board") {
			player.removeBenchPiece({ pieceId });
			player.addBoardPiece({ pieceId, position: to.location });
		}
	},
});
