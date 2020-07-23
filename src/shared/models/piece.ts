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
    maxHealth: number;
    currentHealth: number;
    coolDown: number;

    targetPieceId: string;

    battleBrain?: {
        canMoveAtTurn: number;
        canBeAttackedAtTurn: number; // used to stop pieces being hit as soon as they land
    };
}

export type IndexedPieces = {
    [pieceId: string]: PieceModel;
};
