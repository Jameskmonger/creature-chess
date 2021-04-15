import { v4 as uuid } from "uuid";
import { Card, PieceModel } from "@creature-chess/models";
import { getDefinitionById } from "../../../definitions";

export const createPiece = (
    ownerId: string,
    definitionId: number,
    id?: string,
    stage: number = 0
): PieceModel => {
    const definition = getDefinitionById(definitionId);
    const stats = definition.stages[0];

    return {
        id: id || uuid(),
        ownerId,
        definitionId,
        definition,
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage
    };
};

export const createPieceFromCard = (
    ownerId: string,
    card: Card
) => {
    return createPiece(ownerId, card.definitionId, card.id);
};
