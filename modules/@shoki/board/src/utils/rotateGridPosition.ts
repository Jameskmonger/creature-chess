import { getPiecePositionFromPositionSet } from "../selectors";
import { BoardSize, PiecePosition, PiecePositionsState } from "../types";

export const rotateGridPosition = (
	gridSize: { width: number; height: number },
	position: PiecePosition
): PiecePosition => ({
	x: gridSize.width - 1 - position.x,
	y: gridSize.height - 1 - position.y,
});

export const rotatePiecesAboutCenter = (
	state: PiecePositionsState,
	size: BoardSize
) => {
	const newPositions: { pieceId: string; position: string }[] = [];

	for (const pieceId of Object.values(state)) {
		const position = getPiecePositionFromPositionSet(state, pieceId);

		if (!position) {
			continue;
		}

		const newPosition = rotateGridPosition(size, position);
		const newPositionKey = `${newPosition.x},${newPosition.y}`;

		newPositions.push({ pieceId, position: newPositionKey });
	}

	return newPositions.reduce<{ [position: string]: string }>(
		(acc, { pieceId, position }) => ({
			...acc,
			[position]: pieceId,
		}),
		{}
	);
};
