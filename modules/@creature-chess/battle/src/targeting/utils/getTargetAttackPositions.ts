import {
	createTileCoordinates,
	TileCoordinates,
} from "@creature-chess/models";
import { Board, BoardSize } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

const isInsideGrid =
	({ width, height }: { width: number; height: number }) =>
		(position: TileCoordinates) => {
			const { x, y } = position;

			return x >= 0 && y >= 0 && x < width && y < height;
		};

export function findEnemyInAttackRange(
	board: Board,
	pieceRegistry: PieceRegistry,
	friendlyOwnerId: string,
	piecePosition: TileCoordinates,
	range = 1
) {
	const attackPositions = getTargetAttackPositions(
		{ width: board.width, height: board.height },
		piecePosition,
		range
	);

	for (const position of attackPositions) {
		const pieceId = board.getPieceIdAtPosition(position.x, position.y);

		if (!pieceId) {
			continue;
		}

		const piece = pieceRegistry.getPieceById(pieceId);

		if (!piece || piece.ownerId === friendlyOwnerId) {
			continue;
		}

		return { piece, position };
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
	size: BoardSize,
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
