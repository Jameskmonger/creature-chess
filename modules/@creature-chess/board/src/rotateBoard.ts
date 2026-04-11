import { Board } from "./board";
import { packPosition, unpackX, unpackY } from "./position";
import { rotateGridPosition } from "./rotateGridPosition";

export function rotateBoard(board: Board) {
	const newPositions = board.getAllPieces().map(({ id, x, y }) => {
		const newPos = rotateGridPosition(
			{ width: board.width, height: board.height },
			packPosition(x, y)
		);

		return { id, x: unpackX(newPos), y: unpackY(newPos) };
	});

	board.clear();

	for (const { id, x, y } of newPositions) {
		board.setPiece(id, x, y);
	}
}
