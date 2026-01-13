import { Board } from "./board";
import { PackedPosition, packPosition, unpackX, unpackY } from "./position";

type SortPositionFn = (a: PackedPosition, b: PackedPosition) => -1 | 1;

export const getFirstEmptySlot = (
	state: Board,
	sortPositions: SortPositionFn = topToBottomMiddleSortPositions
): PackedPosition | null => {
	const emptyPositions: PackedPosition[] = [];

	for (let y = 0; y < state.height; y++) {
		for (let x = 0; x < state.width; x++) {
			if (state.getPieceIdAtPosition(x, y)) {
				continue;
			}

			emptyPositions.push(packPosition(x, y));
		}
	}

	if (emptyPositions.length === 0) {
		return null;
	}

	emptyPositions.sort(sortPositions);

	return emptyPositions[0];
};

const SORT_A_FIRST = -1;
const SORT_A_SECOND = 1;
export const topToBottomMiddleSortPositions = (
	a: PackedPosition,
	b: PackedPosition
) => {
	const yA = unpackY(a);
	const yB = unpackY(b);

	if (yA < yB) {
		return SORT_A_FIRST;
	}

	if (yA > yB) {
		return SORT_A_SECOND;
	}

	const xA = unpackX(a);
	const xB = unpackX(b);

	// todo tie this into board size
	const distanceFromMiddleA = Math.abs(xA - 3);
	const distanceFromMiddleB = Math.abs(xB - 3);

	if (distanceFromMiddleA < distanceFromMiddleB) {
		return SORT_A_FIRST;
	}

	if (distanceFromMiddleA > distanceFromMiddleB) {
		return SORT_A_SECOND;
	}

	return SORT_A_FIRST;
};

export const topLeftToBottomRightSortPositions = (
	a: PackedPosition,
	b: PackedPosition
) => {
	const yA = unpackY(a);
	const yB = unpackY(b);

	if (yA < yB) {
		return SORT_A_FIRST;
	}

	if (yA > yB) {
		return SORT_A_SECOND;
	}

	const xA = unpackX(a);
	const xB = unpackX(b);

	if (xA < xB) {
		return SORT_A_FIRST;
	}

	if (xA > xB) {
		return SORT_A_SECOND;
	}

	return SORT_A_FIRST;
};
