import { BoardState, BoardSelectors } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export const getLivingEnemies = (
	piece: PieceModel,
	board: BoardState<PieceModel>
): PieceModel[] =>
	BoardSelectors.getAllPieces(board).filter(
		(other) => other.ownerId !== piece.ownerId && other.currentHealth > 0
	);
