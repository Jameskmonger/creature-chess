import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { definePlayerAction } from "./registry";
import { pieceLocationSchema } from "./pieceLocation";

const dropPieceSchema = z.object({
	pieceId: z.string(),
	to: pieceLocationSchema,
});

export type DropPiecePlayerAction = ReturnType<typeof dropPiecePlayerAction>;
export const dropPiecePlayerAction = createAction<
	z.infer<typeof dropPieceSchema>
>("dropPiecePlayerAction");

export const dropPieceDef = definePlayerAction({
	type: dropPiecePlayerAction.type,
	schema: dropPieceSchema,
	handler: (player, { pieceId, to }) => {
		player.relocatePiece(pieceId, to);
	},
});
