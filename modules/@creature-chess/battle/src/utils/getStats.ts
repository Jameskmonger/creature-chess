import { CreatureLookup, PieceModel } from "@creature-chess/models";

const getDefinition = (piece: PieceModel, creatures: CreatureLookup) => {
	const definition = creatures.get(piece.definitionId);

	if (!definition) {
		throw new Error(`Unknown definitionId: ${piece.definitionId}`);
	}

	return definition;
};

export const getStats = (piece: PieceModel, creatures: CreatureLookup) =>
	getDefinition(piece, creatures).stages[piece.stage];

export const getAttackRange = (
	piece: PieceModel,
	creatures: CreatureLookup
): number => getDefinition(piece, creatures).attackRange;
