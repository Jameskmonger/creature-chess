import { getDefinitionById, PieceModel } from "@creature-chess/models";

export const getStats = (piece: PieceModel) => {
	const definition = getDefinitionById(piece.definitionId);

	if (!definition) {
		throw new Error(`Unknown definitionId: ${piece.definitionId}`);
	}

	return definition.stages[piece.stage];
};
