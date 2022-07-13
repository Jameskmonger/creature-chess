import { Directions, TileCoordinates } from "@creature-chess/models";

export const getNewAttackerFacingAway = (
	oldFacingAway: boolean,
	direction: TileCoordinates
) => {
	if (direction === Directions.LEFT || direction === Directions.RIGHT) {
		// if it's left or right we don't need to change it
		return oldFacingAway;
	}

	if (direction === Directions.UP) {
		return true;
	}

	return false;
};
