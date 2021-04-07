import { v4 as uuid } from "uuid";
import { Card, PieceModel } from "@creature-chess/models";
import { DefinitionProvider } from "../game/definitions/definitionProvider";

export const createPiece = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    definitionId: number,
    id?: string,
    stage: number = 0
): PieceModel => {
    const stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId,
        definitionId,
        definition: definitionProvider.get(definitionId),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage
    };
};

export const getStats = (piece: PieceModel) => piece.definition.stages[piece.stage];

export const createPieceFromCard = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    card: Card
) => {
    return createPiece(definitionProvider, ownerId, card.definitionId, card.id);
};

export const clonePiece =
    (definitionProvider: DefinitionProvider, piece: PieceModel) =>
        createPiece(definitionProvider, piece.ownerId, piece.definitionId, piece.id, piece.stage);

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
