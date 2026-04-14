import { TraitId } from "../gamemode/traits";
import { CreatureDefinition } from "./creatureDefinition";

export interface PieceModel {
	id: string;
	ownerId: string;

	definitionId: number;

	/**
	 * @deprecated The definition data should be instantiated onto the piece itself.
	 */
	definition: CreatureDefinition;

	traits: TraitId[];

	stage: number;

	maxHealth: number;
}

export type IndexedPieces = {
	[pieceId: string]: PieceModel;
};
