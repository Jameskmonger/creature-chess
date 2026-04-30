import { Board } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { getStats } from "../utils/getStats";
import { simulatePiece } from "./piece/simulate";
import { Stores } from "./types";

type TurnEntry = { piece: PieceModel; speed: number };

export const simulateTurn = (
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	stores: Stores
) => {
	const pieces: TurnEntry[] = [];

	board.forEachPiece((id) => {
		const piece = pieceRegistry.getPieceById(id);
		if (piece === null) {
			return;
		}
		pieces.push({ piece, speed: getStats(piece).speed });
	});

	pieces.sort((a, b) => b.speed - a.speed);

	for (const entry of pieces) {
		takePieceTurn(currentTurn, board, pieceRegistry, entry.piece.id, stores);
	}

	for (const entry of pieces) {
		const combat = stores.combatStore.getPiece(entry.piece.id);

		if (combat.currentHealth > 0) {
			stores.combatStore.updatePiecePartial(entry.piece.id, {
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
