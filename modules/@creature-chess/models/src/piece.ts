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

	stage: number;

	/**
	 * Is the piece facing away from the viewer (i.e. looking "north")
	 */
	facingAway: boolean;
	attacking?: AttackDetails | null;
	hit?: HitDetails | null;
	maxHealth: number;
	currentHealth: number;
}

export type IndexedPieces = {
	[pieceId: string]: PieceModel;
};
