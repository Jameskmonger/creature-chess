import { PieceModel } from "@creature-chess/models";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

export const getLivingEnemies = (
	piece: PieceModel,
	board: Board,
	pieceRegistry: PieceRegistry,
): PieceModel[] =>
	board.getAllPieces()
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter(
			(other): other is PieceModel =>
				other !== null
				&& other.ownerId !== piece.ownerId
				&& other.currentHealth > 0
		);
