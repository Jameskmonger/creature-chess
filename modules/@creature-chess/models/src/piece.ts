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

	/**
	 * Is the piece facing away from the viewer (i.e. looking "north")
	 *
	 * @deprecated State/position data should be stored separately from the core piece data.
	 */
	facingAway: boolean;

	maxHealth: number;

	/**
	 * @deprecated State/position data should be stored separately from the core piece data.
	 */
	currentHealth: number;

	/**
	 * @deprecated State/position data should be stored separately from the core piece data.
	 */
	lastBattleStats: {
		damageDealt: number;
		damageTaken: number;
		turnsSurvived: number;
	} | null;
}

export type IndexedPieces = {
	[pieceId: string]: PieceModel;
};
