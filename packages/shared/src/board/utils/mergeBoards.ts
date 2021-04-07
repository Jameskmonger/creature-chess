import { BoardState, reducer, setBoardSizeCommand } from "../state";
import { rotatePiecesAboutCenter } from "./rotateGridPosition";

export const mergeBoards = (home: BoardState, away: BoardState): BoardState => {
  if (home.size.width !== away.size.width || home.size.height !== away.size.height) {
    throw Error("Trying to merge odd-sized boards");
  }

  const newSize = {
    width: home.size.width,
    height: home.size.height * 2
  };
  const expandedHome = reducer(home, setBoardSizeCommand(newSize));
  const expandedAway = reducer(away, setBoardSizeCommand(newSize));

  const rotatedAway = rotatePiecesAboutCenter(expandedAway);

  return {
    pieces: {
      ...expandedHome.pieces,
      ...rotatedAway.pieces
    },
    piecePositions: {
      ...expandedHome.piecePositions,
      ...rotatedAway.piecePositions
    },
    locked: true,
    pieceLimit: null,
    size: newSize
  };
};
