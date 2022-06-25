import { BoardState } from "@shoki/board";

import { createTileCoordinates, TileCoordinates } from "@creature-chess/models";

const isInsideGrid =
	({ width, height }: { width: number; height: number }) =>
	(position: TileCoordinates) => {
		const { x, y } = position;

		return x >= 0 && y >= 0 && x < width && y < height;
	};

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
