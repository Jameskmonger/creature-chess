import { Board } from "./board";
import { packPosition, unpackX, unpackY } from "./position";
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
		const position = packPosition(
			piece.x + differenceWidth,
			piece.y + differenceHeight
		);

		const newPos = rotateGridPosition(
			{ width: newBoard.width, height: newBoard.height },
			position
		);

		newBoard.setPiece(
			piece.id,
			unpackX(newPos),
			unpackY(newPos)
		);
	}

	return newBoard;
};
