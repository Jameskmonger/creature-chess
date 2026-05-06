import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { definePlayerAction } from "./registry";

const swapPieceSchema = z.object({
	pieceAId: z.string(),
	pieceBId: z.string(),
});

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = createAction<
	z.infer<typeof swapPieceSchema>
>("swapPiecePlayerAction");

export const swapPieceDef = definePlayerAction({
	type: swapPiecePlayerAction.type,
	schema: swapPieceSchema,
	handler: (player, { pieceAId, pieceBId }) => {
		player.swapPieces(pieceAId, pieceBId);
	},
});
