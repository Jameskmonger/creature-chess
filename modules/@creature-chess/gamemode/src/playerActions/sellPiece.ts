import { PIECES_TO_EVOLVE, getPiecesForStage } from "@creature-chess/models";

import { sellPiecePlayerAction } from "./creators";
import { definePlayerAction } from "./registry";

export const sellPieceDef = definePlayerAction({
	creator: sellPiecePlayerAction,
	handler: (player, { pieceId }) => {
		const {
			board,
			bench,
			gamemode: { pieceRegistry, creatures },
		} = player;

		const ownsPiece =
			board.containsPiece(pieceId) || bench.containsPiece(pieceId);
		if (!ownsPiece) {
			return;
		}

		const piece = pieceRegistry.getPieceById(pieceId);
		if (!piece) {
			return;
		}

		const definition = creatures.get(piece.definitionId);
		if (!definition) {
			return;
		}

		const piecesUsed = getPiecesForStage(piece.stage, PIECES_TO_EVOLVE);
		player.addMoney(definition.cost * piecesUsed);

		player.removePiece(pieceId);

		player.emitSellPiece(piece);
	},
});
