import { Direction, TileCoordinates, createTileCoordinates } from "./position";

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
    selected?: boolean;
    attacking?: AttackDetails;
    hit?: HitDetails;
    moving?: MovementDetails;
    celebrating?: boolean;

    benched: boolean;
    position: TileCoordinates;
    maxHealth: number;
    currentHealth: number;
    coolDown: number;
}

export const initialCoolDown = 1000;

export const isSamePiece = (a: PokemonPiece, b: PokemonPiece) =>
    a.pokemonId === b.pokemonId
    && a.facingAway === b.facingAway
    && a.friendly === b.friendly
    && a.position.x === b.position.x
    && a.position.y === b.position.y;

let count = 0;

export const makeEnemy = (pokemonId: number, position: [number, number], benched: boolean = false): PokemonPiece => ({
    id: count++,
    pokemonId,
    facingAway: false,
    friendly: false,
    maxHealth: 100,
    currentHealth: 100,
    position: createTileCoordinates(...position),
    coolDown: initialCoolDown,
    benched
});

export const makeFriendly = (pokemonId: number, position: [number, number], benched: boolean = false): PokemonPiece => ({
    id: count++,
    pokemonId,
    facingAway: true,
    friendly: true,
    maxHealth: 100,
    currentHealth: 100,
    position: createTileCoordinates(...position),
    coolDown: initialCoolDown,
    benched
});
