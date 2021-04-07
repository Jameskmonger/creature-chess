import { BoardState } from "../state";
import { rotatePiecesAboutCenter } from "./rotateGridPosition";

const expandBoard = (board: BoardState, { width, height }: { width: number, height: number }): BoardState => {
  const differenceWidth = width - board.size.width;
  const differenceHeight = height - board.size.height;

  return {
    ...board,
    size: { width, height },
    piecePositions: Object.entries(board.piecePositions).reduce<{ [position: string]: string }>(
      (newPiecePositions, [position, pieceId]) => {
        const [x, y] = position.split(",").map(x => parseInt(x, 10));

        const newX = x + differenceWidth;
        const newY = y + differenceHeight;

        return {
          ...newPiecePositions,
          [`${newX},${newY}`]: pieceId
        };
      },
      {}
    )
  };
}

export const mergeBoards = (id: string, home: BoardState, away: BoardState): BoardState => {
  if (home.size.width !== away.size.width || home.size.height !== away.size.height) {
    throw Error("Trying to merge odd-sized boards");
  }

  const newSize = {
    width: home.size.width,
    height: home.size.height * 2
  };
  const expandedHome = expandBoard(home, newSize);
  const expandedAway = expandBoard(away, newSize);

  const rotatedAway = rotatePiecesAboutCenter(expandedAway);

  return {
    id,
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
