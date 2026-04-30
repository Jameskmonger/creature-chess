import { TraitId } from "../gamemode/traits";

export type PieceModel = {
	id: string;
	ownerId: string;
	definitionId: number;
	traits: TraitId[];
	stage: number;
	maxHealth: number;
};

export type IndexedPieces = Record<string, PieceModel>;
