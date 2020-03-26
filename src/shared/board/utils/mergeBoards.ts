import { BoardState } from "../state";
import { GRID_SIZE } from "@common/models/constants";
import { Piece } from "@common/models";
import { createTileCoordinates, XYLocation } from "@common/models/position";

const rotateGridPosition = (position: XYLocation) => {
  return createTileCoordinates(
    GRID_SIZE - 1 - position.x,
    GRID_SIZE - 1 - position.y
  );
};

const transformAwayPieces = (pieces: { [pieceId: string]: Piece }) => {
  return Object.entries(pieces).reduce<{ [pieceId: string]: Piece }>(
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

export const mergeBoards = (home: { [pieceId: string]: Piece }, away: { [pieceId: string]: Piece }): { [pieceId: string]: Piece } => {
  const transformedAway = transformAwayPieces(away);

  return {
    ...home,
    ...transformedAway
  };
};
