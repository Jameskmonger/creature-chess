import uuid = require("uuid/v4");
import { createTileCoordinates } from "../models/position";
import { GRID_SIZE } from "@common/models/constants";
import { DefinitionProvider } from "../game/definitionProvider";
import { Card, PieceModel } from "@common/models";

export const createPiece = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    definitionId: number,
    position: [number, number],
    id?: string,
    stage: number = 0
): PieceModel => {
    const stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId,
        definitionId,
        definition: definitionProvider.get(definitionId),
        position: createTileCoordinates(...position),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage,
        targetPieceId: null
    };
};

export const getStats = (piece: PieceModel) => piece.definition.stages[piece.stage];

export const createPieceFromCard = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    card: Card,
    slot: number
) =>
    createPiece(definitionProvider, ownerId, card.definitionId, [slot, null], card.id);

export const clonePiece =
    (definitionProvider: DefinitionProvider, piece: PieceModel) =>
        createPiece(definitionProvider, piece.ownerId, piece.definitionId, [piece.position.x, piece.position.y], piece.id, piece.stage);

export const moveOrAddPiece = <T extends PieceModel>(allPieces: T[], target: T) => {
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

export const rotatePiecePosition = (piece: PieceModel) => {
    piece.position.x = GRID_SIZE.width - 1 - piece.position.x;
    piece.position.y = GRID_SIZE.height - 1 - piece.position.y;
    return piece;
};
