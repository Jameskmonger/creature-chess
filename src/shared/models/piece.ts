import { TileCoordinates } from "./position";
import { AttackType } from "./creatureDefinition";

export interface AttackDetails {
    direction: TileCoordinates;
    damage: number;
    attackType: AttackType;
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
    stage: number;
    position: TileCoordinates;

    facingAway: boolean;
    attacking?: AttackDetails;
    hit?: HitDetails;
    moving?: MovementDetails;
    celebrating?: boolean;
    maxHealth: number;
    currentHealth: number;
    coolDown: number;

    targetPieceId: string;
}
