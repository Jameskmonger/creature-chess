import { IndexedPieces } from "@creature-chess/models";
import { rotatePiecesAboutCenter } from "./rotateGridPosition";

export const mergeBoards = (gridSize: { width: number, height: number}, home: IndexedPieces, away: IndexedPieces): IndexedPieces => {
  return {
    ...home,
    ...rotatePiecesAboutCenter(gridSize, away)
  };
};
