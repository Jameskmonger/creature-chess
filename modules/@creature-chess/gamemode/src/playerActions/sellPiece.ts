import { z } from "zod";

import { getDefinitionById, PIECES_TO_EVOLVE } from "@creature-chess/models";

import { networkedAction } from "../events/networkedAction";
import { getPiecesForStage } from "../game/evolution";
import { definePlayerAction } from "./registry";

const sellPieceSchema = z.object({
	pieceId: z.string(),
});

export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;
export const sellPiecePlayerAction = networkedAction<
	z.infer<typeof sellPieceSchema>
>("sellPiecePlayerAction");

export const sellPieceDef = definePlayerAction({
	type: sellPiecePlayerAction.type,
	schema: sellPieceSchema,
	handler: (player, { pieceId }) => {
		const {
			board,
			bench,
			gamemode: { pieceRegistry },
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

		const definition = getDefinitionById(piece.definitionId);
		if (!definition) {
			return;
		}

		const piecesUsed = getPiecesForStage(piece.stage, PIECES_TO_EVOLVE);
		player.addMoney(definition.cost * piecesUsed);

		player.removePiece(pieceId);

		player.emitSellPiece(piece);
	},
});
