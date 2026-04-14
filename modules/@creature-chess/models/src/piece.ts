import { TraitId } from "../gamemode/traits";

export interface PieceModel {
	id: string;
	ownerId: string;

	definitionId: number;

	traits: TraitId[];

	stage: number;

	maxHealth: number;
}

export type IndexedPieces = {
	[pieceId: string]: PieceModel;
};
