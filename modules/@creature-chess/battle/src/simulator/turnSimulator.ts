import { PieceModel } from "@creature-chess/models";

import { PieceCombatState, PieceInfoStore } from "../state";
import { getStats } from "../utils/getStats";
import { simulatePiece } from "./piece/simulate";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

type Stores = { combatStore: PieceInfoStore<PieceCombatState> };

export const simulateTurn = (
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	stores: Stores
) => {
	const pieceIds = board.getAllPieces()
		.map(p => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null);

	pieceIds.sort((aPiece, bPiece) => {
		const aStats = getStats(aPiece);
		const bStats = getStats(bPiece);

		return bStats.speed - aStats.speed;
	});

	for (const piece of pieceIds) {
		takePieceTurn(currentTurn, board, pieceRegistry, piece.id, stores);
	}
};

const takePieceTurn = (
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	pieceId: PieceModel["id"],
	{ combatStore }: Stores
) => {
	if (!board.containsPiece(pieceId)) {
		return;
	}

	const piece = pieceRegistry.getPieceById(pieceId);

	if (!piece) {
		return;
	}

	piece.attacking = null;
	piece.hit = null;

	simulatePiece(
		currentTurn,
		board,
		pieceRegistry,
		pieceId,
		{ combatStore }
	);
};
