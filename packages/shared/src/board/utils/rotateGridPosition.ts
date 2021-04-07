import { createTileCoordinates, TileCoordinates, IndexedPieces } from "@creature-chess/models";
import { getPiecePosition } from "../selectors";
import { BoardState } from "../state";

export const rotateGridPosition = (gridSize: { width: number, height: number }, position: TileCoordinates) => {
    return createTileCoordinates(
        gridSize.width - 1 - position.x,
        gridSize.height - 1 - position.y
    );
};

export const rotatePiecesAboutCenter = (state: BoardState): BoardState => {
    const newPositions: { pieceId: string, position: string }[] = [];

    for (const [pieceId] of Object.entries(state.pieces)) {
        const position = getPiecePosition(state, pieceId);
        const newPosition = rotateGridPosition(state.size, position);
        const newPositionKey = `${newPosition.x},${newPosition.y}`;

        newPositions.push({ pieceId, position: newPositionKey });
    }

    return {
        ...state,
        pieces: Object.entries(state.pieces).reduce<IndexedPieces>(
            (acc, [pieceId, piece]) => ({
                ...acc,
                [pieceId]: {
                    ...piece,
                    facingAway: !piece.facingAway
                }
            }),
            {}
        ),
        piecePositions: newPositions.reduce<{ [position: string]: string }>(
            (acc, { pieceId, position }) => ({
                ...acc,
                [position]: pieceId
            }),
            {}
        )
    };
};
