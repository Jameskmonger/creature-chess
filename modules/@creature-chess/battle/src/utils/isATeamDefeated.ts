import { BoardSelectors, BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export const isATeamDefeated = (board: BoardState<PieceModel>) => {
	const pieceOwnerIds = BoardSelectors.getAllPieces(board)
		.filter((p) => p.currentHealth > 0)
		.map((p) => p.ownerId);

	// if there are only pieces belonging to 1 or 0 players, then we have a winner
	return new Set(pieceOwnerIds).size <= 1;
};
