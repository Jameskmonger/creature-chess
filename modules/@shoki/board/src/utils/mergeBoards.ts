import { Board } from "@creature-chess/board";
import { rotateGridPosition } from "./rotateGridPosition";

export const mergeBoards = (
	id: string,
	home: Board,
	away: Board
): Board => {
	if (
		home.width !== away.width ||
		home.height !== away.height
	) {
		throw Error("Trying to merge odd-sized boards");
	}

	const newBoard = new Board(home.width, home.height * 2);

	const differenceWidth = newBoard.width - home.width;
	const differenceHeight = newBoard.height - home.height;

	for (const piece of home.getAllPieces()) {
		newBoard.setPiece(piece.id, piece.x + differenceWidth, piece.y + differenceHeight);
	}

	for (const piece of away.getAllPieces()) {
		const newPos = rotateGridPosition(
			{ width: newBoard.width, height: newBoard.height },
			{ x: piece.x + differenceWidth, y: piece.y + differenceHeight }
		);

		newBoard.setPiece(
			piece.id,
			newPos.x,
			newPos.y
		);
	}

	return newBoard;
};
