import { BoardSelectors, BoardState } from "@shoki/board";

import {
	createTileCoordinates,
	PieceModel,
	TileCoordinates,
} from "@creature-chess/models";

const isInsideGrid =
	({ width, height }: { width: number; height: number }) =>
	(position: TileCoordinates) => {
		const { x, y } = position;

		return x >= 0 && y >= 0 && x < width && y < height;
	};

export function findEnemyInAttackRange(
	board: BoardState<PieceModel>,
	friendlyOwnerId: string,
	piecePosition: TileCoordinates,
	range = 1
) {
	const attackPositions = getTargetAttackPositions(board, piecePosition, range);

	for (const position of attackPositions) {
		const piece = BoardSelectors.getPieceForPosition(
			board,
			position.x,
			position.y
		);

		if (piece && piece.ownerId !== friendlyOwnerId) {
			return { piece, position };
		}
	}

	return null;
}

export const getTargetAttackPositions = (
	board: BoardState,
	{ x: positionX, y: positionY }: TileCoordinates,
	range = 1
) => {
	const positions: TileCoordinates[] = [];

	for (let x = positionX - range; x <= positionX + range; x++) {
		if (x === positionX) {
			continue;
		}

		positions.push(createTileCoordinates(x, positionY));
	}

	for (let y = positionY - range; y <= positionY + range; y++) {
		if (y === positionY) {
			continue;
		}

		positions.push(createTileCoordinates(positionX, y));
	}

	// filter out any that are outside the grid
	return positions.filter(isInsideGrid(board.size));
};
