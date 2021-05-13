import { PiecePosition } from "./types";

const SORT_A_FIRST = -1;
const SORT_A_SECOND = 1;
export const topToBottomMiddleSortPositions = (a: PiecePosition, b: PiecePosition) => {
	if (a.y < b.y) {
		return SORT_A_FIRST;
	}

	if (a.y > b.y) {
		return SORT_A_SECOND;
	}

	// todo tie this into board size
	const distanceFromMiddleA = Math.abs(a.x - 3);
	const distanceFromMiddleB = Math.abs(b.x - 3);

	if (distanceFromMiddleA < distanceFromMiddleB) {
		return SORT_A_FIRST;
	}

	if (distanceFromMiddleA > distanceFromMiddleB) {
		return SORT_A_SECOND;
	}

	return SORT_A_FIRST;
};

export const topLeftToBottomRightSortPositions = (a: PiecePosition, b: PiecePosition) => {
	if (a.y < b.y) {
		return SORT_A_FIRST;
	}

	if (a.y > b.y) {
		return SORT_A_SECOND;
	}

	if (a.x < b.x) {
		return SORT_A_FIRST;
	}

	if (a.x > b.x) {
		return SORT_A_SECOND;
	}

	return SORT_A_FIRST;
};
