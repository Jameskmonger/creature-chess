import { Direction } from "./position";

export type PiecePosition = [number, number];

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

export interface PokemonPiece {
    id: number;
    pokemonId: number;
    facingAway: boolean;
    friendly: boolean;
    attacking?: AttackDetails;
    hit?: HitDetails;
    moving?: MovementDetails;
    celebrating?: boolean;

    position: PiecePosition;
    maxHealth: number;
    currentHealth: number;
    coolDown: number;
}

export const initialCoolDown = 1000;

export const isSamePiece = (a: PokemonPiece, b: PokemonPiece) =>
    a.pokemonId === b.pokemonId
    && a.facingAway === b.facingAway
    && a.friendly === b.friendly
    && a.position[0] === b.position[0]
    && a.position[1] === b.position[1];
