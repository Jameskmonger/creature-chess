import { BoardSelectors, BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export const isATeamDefeated = (board: BoardState<PieceModel>) => {
	const pieceOwnerIds = BoardSelectors.getAllPieces(board).map(
		(p) => p.ownerId
	);

	// if there are only pieces belonging to 1 player, then we have a winner
	return new Set(pieceOwnerIds).size === 1;
};
