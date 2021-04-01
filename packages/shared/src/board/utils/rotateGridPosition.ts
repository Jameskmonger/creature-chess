import { createTileCoordinates, TileCoordinates, IndexedPieces } from "@creature-chess/models";

export const rotateGridPosition = (gridSize: { width: number, height: number }, position: TileCoordinates) => {
    return createTileCoordinates(
        gridSize.width - 1 - position.x,
        gridSize.height - 1 - position.y
    );
};

export const rotatePiecesAboutCenter = (gridSize: { width: number, height: number }, pieces: IndexedPieces) => {
    return Object.entries(pieces).reduce<IndexedPieces>(
        (acc, [pieceId, piece]) => {
            // it's not too bad to mutate `acc` here, because we're creating it as an empty object in this reduce call

            acc[pieceId] = {
                ...piece,
                facingAway: !piece.facingAway,
                position: rotateGridPosition(gridSize, piece.position)
            };

            return acc;
        },
        {}
    );
};
