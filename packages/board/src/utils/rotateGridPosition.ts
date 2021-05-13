import { getPiecePosition } from "../selectors";
import { BoardState, HasId, PiecePosition } from "../types";

export const rotateGridPosition = (gridSize: { width: number, height: number }, position: PiecePosition): PiecePosition => {
	return {
		x: gridSize.width - 1 - position.x,
		y: gridSize.height - 1 - position.y
	};
};

export const rotatePiecesAboutCenter = <TPiece extends HasId, TState extends BoardState<TPiece>>(state: TState): TState => {
	const newPositions: { pieceId: string, position: string }[] = [];

	for (const [pieceId] of Object.entries(state.pieces)) {
		const position = getPiecePosition(state, pieceId);

		if (!position) {
			continue;
		}

		const newPosition = rotateGridPosition(state.size, position);
		const newPositionKey = `${newPosition.x},${newPosition.y}`;

		newPositions.push({ pieceId, position: newPositionKey });
	}

	return {
		...state,
		piecePositions: newPositions.reduce<{ [position: string]: string }>(
			(acc, { pieceId, position }) => ({
				...acc,
				[position]: pieceId
			}),
			{}
		)
	};
};
