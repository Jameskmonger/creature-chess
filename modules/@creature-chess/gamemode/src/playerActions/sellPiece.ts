import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { getDefinitionById, PIECES_TO_EVOLVE } from "@creature-chess/models";

import { afterSellPieceEvent } from "../entities/player/events";
import { playerInfoCommands } from "../entities/player/state/commands";
import { getPiecesForStage } from "../game/evolution";
import { definePlayerAction } from "./registry";

const sellPieceSchema = z.object({
	pieceId: z.string(),
});

export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;
export const sellPiecePlayerAction = createAction<
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
		const pieceCost = definition.cost;
		const currentMoney = player.select((s) => s.playerInfo.money);

		player.put(
			playerInfoCommands.updateMoneyCommand(currentMoney + pieceCost * piecesUsed)
		);

		// todo gross, only remove from one
		player.removeBoardPiece({ pieceId });
		player.removeBenchPiece({ pieceId });

		player.put(afterSellPieceEvent({ piece }));
	},
});
