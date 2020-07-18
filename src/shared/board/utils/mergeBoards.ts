import { GRID_SIZE } from "@common/models/constants";
import { PieceModel } from "@common/models";
import { createTileCoordinates, TileCoordinates } from "@common/models/position";
import { IndexedPieces } from "@common/models/piece";

const rotateGridPosition = (position: TileCoordinates) => {
  return createTileCoordinates(
    GRID_SIZE - 1 - position.x,
    GRID_SIZE - 1 - position.y
  );
};

const transformAwayPieces = (pieces: IndexedPieces) => {
  return Object.entries(pieces).reduce<IndexedPieces>(
    (acc, [pieceId, piece]) => {
      // it's not too bad to mutate `acc` here, because we're creating it as an empty object in this reduce call

      acc[pieceId] = {
        ...piece,
        facingAway: false,
        position: rotateGridPosition(piece.position)
      };

      return acc;
    },
    {}
  );
};

export const mergeBoards = (home: IndexedPieces, away: IndexedPieces): IndexedPieces => {
  const transformedAway = transformAwayPieces(away);

  return {
    ...home,
    ...transformedAway
  };
};
