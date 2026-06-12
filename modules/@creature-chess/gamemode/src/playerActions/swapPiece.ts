import { swapPiecePlayerAction } from "./creators";
import { definePlayerAction } from "./registry";

export const swapPieceDef = definePlayerAction({
	creator: swapPiecePlayerAction,
	handler: (player, { pieceAId, pieceBId }) => {
		player.swapPieces(pieceAId, pieceBId);
	},
});
