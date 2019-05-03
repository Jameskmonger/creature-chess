import uuid = require("uuid/v4");
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
    id: string;
    ownerId: string;

    pokemonId: number;
    facingAway: boolean;
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

export interface BenchPokemonPiece {
    id: string;
    ownerId: string;

    pokemonId: number;
    facingAway: boolean;
    selected?: boolean;
}

export const initialCoolDown = 1000;

export const createPokemon = (ownerId: string, pokemonId: number, position: [number, number], benched: boolean = false): PokemonPiece => ({
    id: uuid(),
    ownerId,
    pokemonId,
    facingAway: true,
    maxHealth: 100,
    currentHealth: 100,
    position: createTileCoordinates(...position),
    coolDown: initialCoolDown,
    benched
});
