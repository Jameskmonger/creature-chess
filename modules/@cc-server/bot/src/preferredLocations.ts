import { PackedPosition, unpackX, unpackY } from "@creature-chess/board";

const SORT_A_FIRST = -1;
const SORT_A_SECOND = 1;
// todo tie this into GRID_SIZE
const ARCANE_ROW_PREFERENCE: { [key: number]: number } = {
	[3]: 2,
	[4]: 0,
	[5]: 1,
};

export const PREFERRED_LOCATIONS: Record<
	"valiant" | "arcane" | "cunning",
	(a: PackedPosition, b: PackedPosition) => -1 | 1
> = {
	valiant: (a, b) => {
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

		// todo tie this into GRID_SIZE
		const distanceFromMiddleA = Math.abs(xA - 3);
		const distanceFromMiddleB = Math.abs(xB - 3);

		if (distanceFromMiddleA < distanceFromMiddleB) {
			return SORT_A_FIRST;
		}

		if (distanceFromMiddleA > distanceFromMiddleB) {
			return SORT_A_SECOND;
		}

		return SORT_A_FIRST;
	},
	cunning: (a, b) => {
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

		// todo tie this into GRID_SIZE
		const distanceFromMiddleA = Math.abs(xA - 3);
		const distanceFromMiddleB = Math.abs(xB - 3);

		if (distanceFromMiddleA > distanceFromMiddleB) {
			return SORT_A_FIRST;
		}

		if (distanceFromMiddleA < distanceFromMiddleB) {
			return SORT_A_SECOND;
		}

		return SORT_A_FIRST;
	},
	arcane: (a, b) => {
		const yA = unpackY(a);
		const yB = unpackY(b);

		if (ARCANE_ROW_PREFERENCE[yA] < ARCANE_ROW_PREFERENCE[yB]) {
			return SORT_A_FIRST;
		}

		if (ARCANE_ROW_PREFERENCE[yA] > ARCANE_ROW_PREFERENCE[yB]) {
			return SORT_A_SECOND;
		}

		const xA = unpackX(a);
		const xB = unpackX(b);

		// todo tie this into GRID_SIZE
		const distanceFromMiddleA = Math.abs(xA - 3);
		const distanceFromMiddleB = Math.abs(xB - 3);

		if (distanceFromMiddleA < distanceFromMiddleB) {
			return SORT_A_FIRST;
		}

		if (distanceFromMiddleA > distanceFromMiddleB) {
			return SORT_A_SECOND;
		}

		return SORT_A_FIRST;
	},
};
