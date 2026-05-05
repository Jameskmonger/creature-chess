import { createAction } from "@reduxjs/toolkit";

import { getDefinitionById, PIECES_TO_EVOLVE } from "@creature-chess/models";

import { afterSellPieceEvent } from "../entities/player/events";
import { PlayerStartListening } from "../entities/player/player";
import { playerInfoCommands } from "../entities/player/state/commands";
import { getPiecesForStage } from "../game/evolution";

export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;
export const sellPiecePlayerAction = createAction<{ pieceId: string }>(
	"sellPiecePlayerAction"
);

export const setupSellPieceListener = (
	startListening: PlayerStartListening
) => {
	startListening({
		actionCreator: sellPiecePlayerAction,
		effect: async ({ payload: { pieceId } }, api) => {
			const {
				board,
				bench,
				gamemode: { pieceRegistry },
			} = api.player;

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
			const currentMoney = api.getState().playerInfo.money;

			api.dispatch(
				playerInfoCommands.updateMoneyCommand(
					currentMoney + pieceCost * piecesUsed
				)
			);

			// todo gross, only remove from one
			api.player.removeBoardPiece({ pieceId });
			api.player.removeBenchPiece({ pieceId });

			api.dispatch(afterSellPieceEvent({ piece }));
		},
	});
};
