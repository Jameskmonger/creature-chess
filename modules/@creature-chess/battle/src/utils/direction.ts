import { PackedPosition, unpackPosition } from "@creature-chess/board";

export const Directions: Record<"UP" | "RIGHT" | "DOWN" | "LEFT", { x: -1 | 0 | 1; y: -1 | 0 | 1 }> = {
	UP: { x: 0, y: -1 },
	RIGHT: { x: 1, y: 0 },
	DOWN: { x: 0, y: 1 },
	LEFT: { x: -1, y: 0 },
};

export type Direction = typeof Directions[keyof typeof Directions];

/**
 * Returns the relative direction of position b from the perspective of position a
 *
 * @param from The position to find the direction relative from
 * @param to The position to find the direction relative to
 */
export const getRelativeDirection = (
	from: PackedPosition,
	to: PackedPosition
): Direction | { x: 0; y: 0 } => {
	const [fromX, fromY] = unpackPosition(from);
	const [toX, toY] = unpackPosition(to);

	if (fromX < toX) {
		return Directions.RIGHT;
	}
	if (fromX > toX) {
		return Directions.LEFT;
	}
	if (fromY < toY) {
		return Directions.DOWN;
	}
	if (fromY > toY) {
		return Directions.UP;
	}
	return { x: 0, y: 0 };
};
