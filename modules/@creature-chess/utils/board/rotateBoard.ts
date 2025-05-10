import { BoardState, rotatePiecesAboutCenter } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export function rotateBoard(
	board: BoardState<PieceModel>
): BoardState<PieceModel> {
	const newBoard: BoardState<PieceModel> = {
		...board,
		piecePositions: rotatePiecesAboutCenter(board).piecePositions,
	};

	for (const pieceId in newBoard.pieces) {
		if (newBoard.pieces.hasOwnProperty(pieceId)) {
			newBoard.pieces[pieceId].facingAway =
				!newBoard.pieces[pieceId].facingAway;
		}
	}

	return newBoard;
}
