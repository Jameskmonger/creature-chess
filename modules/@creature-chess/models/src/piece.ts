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
	definition: CreatureDefinition;

	traits: TraitId[];

	stage: number;

	/**
	 * Is the piece facing away from the viewer (i.e. looking "north")
	 */
	facingAway: boolean;
	attacking?: AttackDetails | null;
	hit?: HitDetails | null;
	maxHealth: number;
	currentHealth: number;

	lastBattleStats: {
		damageDealt: number;
		damageTaken: number;
		turnsSurvived: number;
	} | null;
}

export type IndexedPieces = {
	[pieceId: string]: PieceModel;
};
