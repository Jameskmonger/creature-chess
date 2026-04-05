import { createAction } from "@reduxjs/toolkit";

import { PIECES_TO_EVOLVE } from "@creature-chess/models/config";

import { PlayerStartListening } from "../entities/player/player";
import { afterSellPieceEvent } from "../entities/player/events";
import { playerInfoCommands } from "../entities/player/state/commands";
import { getPiecesForStage } from "../game/evolution";
import { removeBenchPieceCommand, removeBoardPieceCommand } from "../entities/player/state/board";

export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;
export const sellPiecePlayerAction = createAction<{ pieceId: string }>(
	"sellPiecePlayerAction"
);

export const setupSellPieceListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: sellPiecePlayerAction,
		effect: async ({ payload: { pieceId } }, api) => {
			const { board, bench, gamemode: { pieceRegistry } } = api.player;

			const ownsPiece = board.containsPiece(pieceId) || bench.containsPiece(pieceId);

			if (!ownsPiece) {
				return;
			}

			const piece = pieceRegistry.getPieceById(pieceId);

			if (!piece) {
				return;
			}

			const piecesUsed = getPiecesForStage(piece.stage, PIECES_TO_EVOLVE);
			const pieceCost = piece.definition.cost;
			const currentMoney = api.getState().playerInfo.money;

			api.dispatch(
				playerInfoCommands.updateMoneyCommand(
					currentMoney + pieceCost * piecesUsed
				)
			);

			// todo gross, only remove from one
			api.dispatch(removeBoardPieceCommand({ pieceId }));
			api.dispatch(removeBenchPieceCommand({ pieceId }));

			api.dispatch(afterSellPieceEvent({ piece }));
		},
	});
};
