import uuid = require("uuid/v4");
import { Direction, TileCoordinates, createTileCoordinates } from "./position";
import { GRID_SIZE } from "./constants";
import { getPokemonStats } from "./pokemon-details";
import { PokemonCard } from "./pokemon-card";

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

export const createPokemon = (ownerId: string, pokemonId: number, position: [number, number], id?: string): PokemonPiece => {
    const stats = getPokemonStats(pokemonId);
    return {
        id: id || uuid(),
        ownerId,
        pokemonId,
        position: createTileCoordinates(...position),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        coolDown: initialCoolDown
    };
};

export const createPieceFromCard = (ownerId: string, card: PokemonCard, slot: number) =>
    createPokemon(ownerId, card.definitionId, [ slot, null ], card.id);

export const clonePokemonPiece = (piece: PokemonPiece) => createPokemon(piece.ownerId, piece.pokemonId, [piece.position.x, piece.position.y]);

export const moveOrAddPiece = <T extends PokemonPiece>(allPieces: T[], target: T) => {
    const result: T[] = [];
    let targetAdded = false;

    for (const p of allPieces) {
        // if this isn't the target just push it
        if (p.id !== target.id) {
            result.push(p);
            continue;
        }

        // otherwise add the target
        result.push(target);
        targetAdded = true;
    }

    if (targetAdded === false) {
        result.push(target);
    }

    return result;
};

export const rotatePiecePosition = (piece: PokemonPiece) => {
    piece.position.x = GRID_SIZE - 1 - piece.position.x;
    piece.position.y = GRID_SIZE - 1 - piece.position.y;
    return piece;
};
