import { isAnyOf } from "@reduxjs/toolkit";

import {
	evolvePieces,
	pieceCanEvolve,
	queueEvolutionCheck,
} from "../operations/evolution";
import { PlayerStartListening } from "../player";
import {
	addBenchPieceCommand,
	addBoardPieceCommand,
} from "../state/board";
import { isPlayerBoardLocked } from "../state/selectors";

export const setupEvolutionListener = (
	startListening: PlayerStartListening
) => {
	startListening({
		matcher: isAnyOf(addBoardPieceCommand, addBenchPieceCommand),
		effect: async (action, api) => {
			const { pieceId } = (
				action as
					| ReturnType<typeof addBoardPieceCommand>
					| ReturnType<typeof addBenchPieceCommand>
			).payload;

			const piece = api.player.gamemode.pieceRegistry.getPieceById(pieceId);
			if (!piece || !pieceCanEvolve(piece)) {
				return;
			}

			if (isPlayerBoardLocked(api.getState())) {
				queueEvolutionCheck(api.player, piece.definitionId, piece.stage);
				return;
			}

			evolvePieces(api.player, piece.definitionId, piece.stage);
		},
	});
};
