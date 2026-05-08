import { Board } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { PieceCombatState, PieceInfoStore } from "../../state";

export const getLivingEnemies = (
	piece: PieceModel,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	combatStore: PieceInfoStore<PieceCombatState>
): PieceModel[] =>
	board
		.getAllPieces()
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter(
			(other): other is PieceModel =>
				other !== null &&
				other.ownerId !== piece.ownerId &&
				combatStore.getPiece(other.id).currentHealth > 0
		);
