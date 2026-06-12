import { dropPiecePlayerAction } from "./creators";
import { definePlayerAction } from "./registry";

export const dropPieceDef = definePlayerAction({
	creator: dropPiecePlayerAction,
	handler: (player, { pieceId, to }) => {
		player.relocatePiece(pieceId, to);
	},
});
