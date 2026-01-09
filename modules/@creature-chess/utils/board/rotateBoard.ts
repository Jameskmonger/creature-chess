import { BoardState, rotatePiecesAboutCenter } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { Board } from "@creature-chess/board";
import { rotateGridPosition } from "@shoki/board/src/utils/rotateGridPosition";

export function rotateBoard(
	board: Board
) {
	const newPositions = board.getAllPieces()
		.map(({ id, x, y }) => {
			const newPos = rotateGridPosition({ width: board.width, height: board.height }, { x, y });

			return { id, x: newPos.x, y: newPos.y };
		});

	board.clear();

	for (const { id, x, y } of newPositions) {
		board.setPiece(id, x, y);
	}
}
