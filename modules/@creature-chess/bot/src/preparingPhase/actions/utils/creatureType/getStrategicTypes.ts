import { CreatureType, PieceModel } from "@creature-chess/models";

import { getOwnedPieceTypes } from "./getOwnedTypes";

const ALL_TYPES = [
	CreatureType.Earth,
	CreatureType.Fire,
	CreatureType.Metal,
	CreatureType.Water,
	CreatureType.Wood,
];

export const getStrategicTypes = (allPieces: PieceModel[]) => {
	const ownedPieceTypes = getOwnedPieceTypes(allPieces);
	const averageNumberOfEachType = Math.ceil(
		allPieces.length / ALL_TYPES.length
	);

	return ALL_TYPES.filter((type) => {
		const ownedCount = ownedPieceTypes[type];

		return ownedCount === 0 || ownedCount < averageNumberOfEachType;
	});
};
