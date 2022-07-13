import { PieceModel } from "@creature-chess/models";

export const getStats = (piece: PieceModel) =>
	piece.definition.stages[piece.stage];
