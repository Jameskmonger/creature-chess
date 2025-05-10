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
	const attackPositions = getTargetAttackPositions(
		board.size,
		piecePosition,
		range
	);

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

/**
 * Finds all positions from which a piece can attack the given position.
 *
 * @param size The size of the board.
 * @param position The position of the target piece.
 * @param range The attack range of the attacking piece.
 * @returns An array of positions from which the piece can attack the target position.
 */
export const getTargetAttackPositions = (
	size: BoardState["size"],
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
	return positions.filter(isInsideGrid(size));
};
