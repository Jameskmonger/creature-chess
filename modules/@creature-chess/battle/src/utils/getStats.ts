import { getDefinitionById, PieceModel } from "@creature-chess/models";

const getDefinition = (piece: PieceModel) => {
	const definition = getDefinitionById(piece.definitionId);

	if (!definition) {
		throw new Error(`Unknown definitionId: ${piece.definitionId}`);
	}

	return definition;
};

export const getStats = (piece: PieceModel) =>
	getDefinition(piece).stages[piece.stage];

export const getAttackRange = (piece: PieceModel): number =>
	getDefinition(piece).attackRange;
