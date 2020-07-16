import { GRID_SIZE } from "@common/models/constants";
import { PieceModel } from "@common/models";
import { createTileCoordinates, TileCoordinates } from "@common/models/position";

const rotateGridPosition = (position: TileCoordinates) => {
  return createTileCoordinates(
    GRID_SIZE - 1 - position.x,
    GRID_SIZE - 1 - position.y
  );
};

const transformAwayPieces = (pieces: { [pieceId: string]: PieceModel }) => {
  return Object.entries(pieces).reduce<{ [pieceId: string]: PieceModel }>(
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

export const mergeBoards = (home: { [pieceId: string]: PieceModel }, away: { [pieceId: string]: PieceModel }): { [pieceId: string]: PieceModel } => {
  const transformedAway = transformAwayPieces(away);

  return {
    ...home,
    ...transformedAway
  };
};
