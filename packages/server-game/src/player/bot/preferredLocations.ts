import { DefinitionClass, TileCoordinates } from "@creature-chess/models";

const SORT_A_FIRST = -1;
const SORT_A_SECOND = 1;
// todo tie this into GRID_SIZE
const ARCANE_ROW_PREFERENCE: { [key: number]: number } = {
	[3]: 2,
	[4]: 0,
	[5]: 1
};

export const PREFERRED_LOCATIONS: {
	[key in DefinitionClass]: (a: TileCoordinates, b: TileCoordinates) => -1 | 1
} = {
	[DefinitionClass.VALIANT]: (a, b) => {
		if (a.y < b.y) {
			return SORT_A_FIRST;
		}

		if (a.y > b.y) {
			return SORT_A_SECOND;
		}

		// todo tie this into GRID_SIZE
		const distanceFromMiddleA = Math.abs(a.x - 3);
		const distanceFromMiddleB = Math.abs(b.x - 3);

		if (distanceFromMiddleA < distanceFromMiddleB) {
			return SORT_A_FIRST;
		}

		if (distanceFromMiddleA > distanceFromMiddleB) {
			return SORT_A_SECOND;
		}

		return SORT_A_FIRST;
	},
	[DefinitionClass.CUNNING]: (a, b) => {
		if (a.y < b.y) {
			return SORT_A_FIRST;
		}

		if (a.y > b.y) {
			return SORT_A_SECOND;
		}

		// todo tie this into GRID_SIZE
		const distanceFromMiddleA = Math.abs(a.x - 3);
		const distanceFromMiddleB = Math.abs(b.x - 3);

		if (distanceFromMiddleA > distanceFromMiddleB) {
			return SORT_A_FIRST;
		}

		if (distanceFromMiddleA < distanceFromMiddleB) {
			return SORT_A_SECOND;
		}

		return SORT_A_FIRST;
	},
	[DefinitionClass.ARCANE]: (a, b) => {
		if (ARCANE_ROW_PREFERENCE[a.y] < ARCANE_ROW_PREFERENCE[b.y]) {
			return SORT_A_FIRST;
		}

		if (ARCANE_ROW_PREFERENCE[a.y] > ARCANE_ROW_PREFERENCE[b.y]) {
			return SORT_A_SECOND;
		}

		// todo tie this into GRID_SIZE
		const distanceFromMiddleA = Math.abs(a.x - 3);
		const distanceFromMiddleB = Math.abs(b.x - 3);

		if (distanceFromMiddleA < distanceFromMiddleB) {
			return SORT_A_FIRST;
		}

		if (distanceFromMiddleA > distanceFromMiddleB) {
			return SORT_A_SECOND;
		}

		return SORT_A_FIRST;
	},
};
