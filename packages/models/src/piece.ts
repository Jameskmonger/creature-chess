import { TileCoordinates } from "./position";
import { AttackType, CreatureDefinition } from "./creatureDefinition";
import { PieceCombatState } from "./pieceCombat";

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
    position: TileCoordinates;

    facingAway: boolean;
    attacking?: AttackDetails;
    hit?: HitDetails;
    maxHealth: number;
    currentHealth: number;

    targetPieceId: string;

    combat?: PieceCombatState;
}

export type IndexedPieces = {
    [pieceId: string]: PieceModel;
};
