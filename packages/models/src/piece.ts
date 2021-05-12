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

    facingAway: boolean;
    attacking?: AttackDetails | null;
    hit?: HitDetails | null;
    maxHealth: number;
    currentHealth: number;

    combat?: PieceCombatState;
}

export interface CombatPieceModel extends PieceModel {
    combat: PieceCombatState;
}

export type IndexedPieces = {
    [pieceId: string]: PieceModel;
};
