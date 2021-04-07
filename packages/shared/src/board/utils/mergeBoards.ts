import { BoardState } from "../state";
import { rotatePiecesAboutCenter } from "./rotateGridPosition";

export const mergeBoards = (gridSize: { width: number, height: number}, home: BoardState, away: BoardState): BoardState => {
  const rotatedAway = rotatePiecesAboutCenter(gridSize, away);

  return {
    pieces: {
      ...home.pieces,
      ...rotatedAway.pieces
    },
    piecePositions: {
      ...home.piecePositions,
      ...rotatedAway.piecePositions
    },
    locked: true,
    pieceLimit: null
  };
};
