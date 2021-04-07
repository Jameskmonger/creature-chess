import { PieceModel } from "@creature-chess/models";
import { BoardState } from "../../board";

interface PlayerPiecesState {
  board: BoardState;
  bench: BoardState;
}

export const getPiece = (state: PlayerPiecesState, pieceId: string): PieceModel => {
  const boardPiece = state.board.pieces[pieceId];
  if (boardPiece) {
    return boardPiece;
  }

  const benchPiece = state.bench.pieces[pieceId];
  if (benchPiece) {
    return benchPiece;
  }

  return null;
};
export const getBoardPieceForPosition =
  (state: BoardState, x: number, y: number): PieceModel => state.pieces[state.piecePositions[`${x},${y}`]] || null;
export const getAllPieces = (state: PlayerPiecesState): PieceModel[] => [
  ...(Object.values(state.board.pieces) as PieceModel[]), ...(Object.values(state.bench.pieces) as PieceModel[])
];
export const getBoardPiecesForDefinition =
  (state: PlayerPiecesState, definitionId: number): PieceModel[] =>
    (Object.values(state.board.pieces) as PieceModel[]).filter(p => p.definitionId === definitionId);
export const getBenchPiecesForDefinition =
  (state: PlayerPiecesState, definitionId: number): PieceModel[] =>
    (Object.values(state.bench.pieces) as PieceModel[]).filter(p => p.definitionId === definitionId);

export const getBoardPiecesByStage =
  (state: PlayerPiecesState, stage: number): PieceModel[] =>
    (Object.values(state.board.pieces) as PieceModel[]).filter(p => p.stage === stage);
export const getBoardPiecesExceptStage =
  (state: PlayerPiecesState, stage: number): PieceModel[] =>
    (Object.values(state.board.pieces) as PieceModel[]).filter(p => p.stage !== stage);
export const getBenchPiecesByStage =
  (state: PlayerPiecesState, stage: number): PieceModel[] =>
    (Object.values(state.bench.pieces) as PieceModel[]).filter(p => p.stage === stage);
export const getBoardPieceCount = (state: PlayerPiecesState): number => Object.values(state.board.pieces).length;
export const hasSpaceOnBench = (state: PlayerPiecesState): boolean => getFirstEmptyBenchSlot(state) !== null;
export const getFirstEmptyBenchSlot = (state: PlayerPiecesState): number => {
  for (let x = 0; x < state.bench.size.width; x++) {
    if (!state.bench.piecePositions[`${x},0`]) {
      return x;
    }
  }

  return null;
};
