import { GRID_SIZE } from "@common/models/constants";
import { PieceModel } from "@common/models";
import { createTileCoordinates, TileCoordinates } from "@common/models/position";
import { IndexedPieces } from "@common/models/piece";

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
