import uuid = require("uuid/v4");
import { createTileCoordinates } from "./position";
import { GRID_SIZE, INITIAL_COOLDOWN } from "./constants";
import { getStats } from "./models/creatureDefinition";
import { Card, Piece } from "./models";

export const createPiece = (ownerId: string, definitionId: number, position: [number, number], id?: string): Piece => {
    const stats = getStats(definitionId);
    return {
        id: id || uuid(),
        ownerId,
        definitionId,
        position: createTileCoordinates(...position),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        coolDown: INITIAL_COOLDOWN
    };
};

export const createPieceFromCard = (ownerId: string, card: Card, slot: number) =>
    createPiece(ownerId, card.definitionId, [ slot, null ], card.id);

export const clonePiece = (piece: Piece) => createPiece(piece.ownerId, piece.definitionId, [piece.position.x, piece.position.y]);

export const moveOrAddPiece = <T extends Piece>(allPieces: T[], target: T) => {
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

export const rotatePiecePosition = (piece: Piece) => {
    piece.position.x = GRID_SIZE - 1 - piece.position.x;
    piece.position.y = GRID_SIZE - 1 - piece.position.y;
    return piece;
};
