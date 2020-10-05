import { GRID_SIZE } from "@creature-chess/models/src/constants";
import { PieceModel } from "@creature-chess/models";
import { createTileCoordinates, TileCoordinates } from "@creature-chess/models/src/position";
import { IndexedPieces } from "@creature-chess/models/src/piece";

const rotateGridPosition = (gridSize: { width: number, height: number}, position: TileCoordinates) => {
  return createTileCoordinates(
    gridSize.width - 1 - position.x,
    gridSize.height - 1 - position.y
  );
};

const transformAwayPieces = (gridSize: { width: number, height: number}, pieces: IndexedPieces) => {
  return Object.entries(pieces).reduce<IndexedPieces>(
    (acc, [pieceId, piece]) => {
      // it's not too bad to mutate `acc` here, because we're creating it as an empty object in this reduce call

      acc[pieceId] = {
        ...piece,
        facingAway: false,
        position: rotateGridPosition(gridSize, piece.position)
      };

      return acc;
    },
    {}
  );
};

export const mergeBoards = (gridSize: { width: number, height: number}, home: IndexedPieces, away: IndexedPieces): IndexedPieces => {
  const transformedAway = transformAwayPieces(gridSize, away);

  return {
    ...home,
    ...transformedAway
  };
};
