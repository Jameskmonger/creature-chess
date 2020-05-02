import { Direction, XYLocation } from "./position";

export interface AttackDetails {
    direction: Direction;
    damage: number;
}

export interface HitDetails {
    direction: Direction;
    damage: number;
}

export interface MovementDetails {
    direction: Direction;
}

export interface Piece {
    id: string;
    ownerId: string;
    definitionId: number;
    stage: number;
    position: XYLocation;

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
