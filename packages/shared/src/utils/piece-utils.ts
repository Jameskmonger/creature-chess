import { v4 as uuid } from "uuid";
import { createTileCoordinates, Card, PieceModel, PlayerPieceLocation, GRID_SIZE } from "@creature-chess/models";
import { DefinitionProvider } from "../game/definitions/definitionProvider";

export const createPiece = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    definitionId: number,
    position: [number, number] | null,
    id?: string,
    stage: number = 0
): PieceModel => {
    const stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId,
        definitionId,
        definition: definitionProvider.get(definitionId),
        position: position ? createTileCoordinates(...position) : null,
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage,
        targetPieceId: null
    };
};

export const getStats = (piece: PieceModel) => piece.definition.stages[piece.stage];

const getPositionFromLocation = (location: PlayerPieceLocation): [number, number | null] => {
    if (location.type === "board") {
        return [location.location.x, location.location.y];
    } else if (location.type === "bench") {
        return [location.location.slot, null];
    }
};

export const createPieceFromCard = (
    definitionProvider: DefinitionProvider,
    ownerId: string,
    card: Card
) => {
    return createPiece(definitionProvider, ownerId, card.definitionId, null, card.id);
};

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

export const createMockPiece = (id: string): PieceModel => ({
  id,
  ownerId: "123",
  definitionId: 1,
  definition: new DefinitionProvider().get(1),
  stage: 0,
  position: createTileCoordinates(0, 0),
  facingAway: true,
  currentHealth: 100,
  maxHealth: 100,
  targetPieceId: null
});
