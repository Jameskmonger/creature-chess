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
    position: TileCoordinates;
    selected?: boolean;
}

export interface BoardPokemonPiece extends PokemonPiece {
    facingAway: boolean;
    attacking?: AttackDetails;
    hit?: HitDetails;
    moving?: MovementDetails;
    celebrating?: boolean;
    maxHealth: number;
    currentHealth: number;
    coolDown: number;
}

export const initialCoolDown = 1000;

export const createPokemon = (ownerId: string, pokemonId: number, position: [number, number]): BoardPokemonPiece => ({
    id: uuid(),
    ownerId,
    pokemonId,
    position: createTileCoordinates(...position),
    facingAway: true,
    maxHealth: 100,
    currentHealth: 100,
    coolDown: initialCoolDown
});

export const createBenchPokemon = (ownerId: string, pokemonId: number, slot: number) => ({
    id: uuid(),
    ownerId,
    pokemonId,
    position: createTileCoordinates(null, slot)
});
