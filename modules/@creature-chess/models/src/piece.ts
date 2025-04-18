import { TraitId } from "../gamemode/traits";
import { AttackType, CreatureDefinition } from "./creatureDefinition";
import { TileCoordinates } from "./position";

export interface AttackDetails {
	direction: TileCoordinates;
	damage: number;
	attackType: AttackType;
	distance: number;
}

export interface HitDetails {
	direction: TileCoordinates;
	damage: number;
}

export interface MovementDetails {
	direction: TileCoordinates;
}

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

	/**
	 * @deprecated State/position data should be stored separately from the core piece data.
	 */
	attacking?: AttackDetails | null;

	/**
	 * @deprecated State/position data should be stored separately from the core piece data.
	 */
	hit?: HitDetails | null;

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
