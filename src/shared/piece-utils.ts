import uuid = require("uuid/v4");
import { createTileCoordinates } from "./position";
import { GRID_SIZE, INITIAL_COOLDOWN } from "./constants";
import { DefinitionProvider } from "./game/definitionProvider";
import { Card, Piece } from "./models";

export const createPiece = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    definitionId: number,
    position: [number, number],
    damagePerTurn: number | null,
    id?: string,
    stage: number = 0
): Piece => {
    const stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId,
        definitionId,
        position: createTileCoordinates(...position),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        coolDown: INITIAL_COOLDOWN,
        damagePerTurn,
        stage,
        targetPieceId: null
    };
};

export const createPieceFromCard = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    card: Card,
    slot: number
) =>
    createPiece(definitionProvider, ownerId, card.definitionId, [slot, null], null, card.id);

export const clonePiece =
    (definitionProvider: DefinitionProvider, piece: Piece) =>
        createPiece(definitionProvider, piece.ownerId, piece.definitionId, [piece.position.x, piece.position.y], 0, piece.id, piece.stage);

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
