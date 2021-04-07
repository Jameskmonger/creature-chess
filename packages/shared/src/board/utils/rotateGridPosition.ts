import { createTileCoordinates, TileCoordinates, IndexedPieces } from "@creature-chess/models";
import { getPiecePosition } from "../selectors";
import { BoardState } from "../state";

export const rotateGridPosition = (gridSize: { width: number, height: number }, position: TileCoordinates) => {
    return createTileCoordinates(
        gridSize.width - 1 - position.x,
        gridSize.height - 1 - position.y
    );
};

export const rotatePiecesAboutCenter = (gridSize: { width: number, height: number }, state: BoardState): BoardState => {
    let newState: BoardState = {
        ...state,
        piecePositions: {
            ...state.piecePositions
        }
    };

    for (const [ pieceId, piece ] of Object.entries(state.pieces)) {
        const position = getPiecePosition(state, pieceId);
        const positionKey = `${position.x},${position.y}`;

        const newPosition = rotateGridPosition(gridSize, position);
        const newPositionKey = `${newPosition.x},${newPosition.y}`;

        newState = {
            ...newState,
            piecePositions: {
                ...newState.piecePositions,
                [positionKey]: undefined,
                [newPositionKey]: pieceId
            }
        }
    }

    return newState;
};
