import { Board } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { getStats } from "../utils/getStats";
import { simulatePiece } from "./piece/simulate";
import { Stores } from "./types";

export const simulateTurn = (
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	stores: Stores
) => {
	const pieces = board
		.getAllPieces()
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null);

	pieces.sort((aPiece, bPiece) => {
		const aStats = getStats(aPiece);
		const bStats = getStats(bPiece);

		return bStats.speed - aStats.speed;
	});

	for (const piece of pieces) {
		takePieceTurn(currentTurn, board, pieceRegistry, piece.id, stores);
	}

	for (const piece of pieces) {
		if (!piece) {
			continue;
		}

		const combat = stores.combatStore.getPiece(piece.id);
		if (combat.currentHealth > 0) {
			stores.combatStore.updatePiecePartial(piece.id, {
				battleStats: {
					...combat.battleStats,
					turnsSurvived: combat.battleStats.turnsSurvived + 1,
				},
			});
		}
	}
};

const takePieceTurn = (
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	pieceId: PieceModel["id"],
	stores: Stores
) => {
	if (!board.containsPiece(pieceId)) {
		return;
	}

	const piece = pieceRegistry.getPieceById(pieceId);

	if (!piece) {
		return;
	}

	simulatePiece(currentTurn, board, pieceRegistry, pieceId, stores);
};
