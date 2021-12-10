import { CreatureType, PieceModel } from "@creature-chess/models";

const INITIAL_VALUE = {
	[CreatureType.Earth]: 0,
	[CreatureType.Fire]: 0,
	[CreatureType.Metal]: 0,
	[CreatureType.Water]: 0,
	[CreatureType.Wood]: 0,
};

export const getOwnedPieceTypes = (allPieces: PieceModel[]) =>
	allPieces.reduce((acc, cur) => ({
		...acc,
		[cur.definition.type]: acc[cur.definition.type] + 1
	}), INITIAL_VALUE);
