export type TileCoordinates = { x: number, y: number };
export type SlotLocation = { slot: number };

export const createTileCoordinates = (x: number, y: number): TileCoordinates => ({ x, y });
export const getDelta = (a: TileCoordinates, b: TileCoordinates) => {
	return {
		x: Math.abs(a.x - b.x),
		y: Math.abs(a.y - b.y)
	};
};
export const getDistance = (a: TileCoordinates, b: TileCoordinates) => {
	const { x, y } = getDelta(a, b);

	return x + y;
};

export const Directions = {
	UP: { x: 0, y: -1 },
	RIGHT: { x: 1, y: 0 },
	DOWN: { x: 0, y: 1 },
	LEFT: { x: -1, y: 0 }
};

/**
 * Returns the relative direction of position b from the perspective of position a
 * @param from The position to find the direction relative from
 * @param to The position to find the direction relative to
 */
export const getRelativeDirection = (from: TileCoordinates, to: TileCoordinates) => {
	if (from.x < to.x) {
		return Directions.RIGHT;
	}
	if (from.x > to.x) {
		return Directions.LEFT;
	}
	if (from.y < to.y) {
		return Directions.DOWN;
	}
	if (from.y > to.y) {
		return Directions.UP;
	}
	return { x: 0, y: 0 };
};

export enum TileType {
	BOARD,
	BENCH
}
