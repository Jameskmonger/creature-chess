import { v4 as uuid } from "uuid";
import { Card, PieceModel } from "@creature-chess/models";
import { DefinitionProvider } from "../../../definitions/definitionProvider";

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

export const createPieceFromCard = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    card: Card
) => {
    return createPiece(definitionProvider, ownerId, card.definitionId, card.id);
};
