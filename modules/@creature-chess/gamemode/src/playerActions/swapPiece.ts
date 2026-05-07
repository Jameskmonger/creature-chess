import { z } from "zod";

import { networkedAction } from "../events/networkedAction";
import { definePlayerAction } from "./registry";

const swapPieceSchema = z.object({
	pieceAId: z.string(),
	pieceBId: z.string(),
});

export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;
export const swapPiecePlayerAction = networkedAction<
	z.infer<typeof swapPieceSchema>
>("swapPiecePlayerAction");

export const swapPieceDef = definePlayerAction({
	type: swapPiecePlayerAction.type,
	schema: swapPieceSchema,
	handler: (player, { pieceAId, pieceBId }) => {
		player.swapPieces(pieceAId, pieceBId);
	},
});
