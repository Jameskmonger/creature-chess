import { PieceModel } from "@creature-chess/models";
import { BoardState } from "../../board";
import { BenchState } from "./bench";

interface PlayerPiecesState {
  board: BoardState;
  bench: BenchState;
}

export const getPiece = (state: PlayerPiecesState, pieceId: string): PieceModel => {
  const boardPiece = state.board.pieces[pieceId];
  if (boardPiece) {
    return boardPiece;
  }

  const benchPiece = state.bench.pieces.find(p => p && p.id === pieceId);
  if (benchPiece) {
    return benchPiece;
  }

  return null;
};
export const getBenchPieceForSlot = (state: PlayerPiecesState, slot: number): PieceModel => state.bench.pieces[slot] || null;
export const getBoardPieceForPosition =
  (state: BoardState, x: number, y: number): PieceModel => state.pieces[state.piecePositions[`${x},${y}`]] || null;
export const getAllPieces = (state: PlayerPiecesState): PieceModel[] => [
  ...(Object.values(state.board.pieces) as PieceModel[]), ...state.bench.pieces.filter(p => p !== null)
];
export const getBoardPiecesForDefinition =
  (state: PlayerPiecesState, definitionId: number): PieceModel[] =>
  (Object.values(state.board.pieces) as PieceModel[]).filter(p => p.definitionId === definitionId);
export const getBenchPiecesForDefinition =
  (state: PlayerPiecesState, definitionId: number): PieceModel[] => state.bench.pieces.filter(p => p && p.definitionId === definitionId);

export const getBoardPiecesByStage =
(state: PlayerPiecesState, stage: number): PieceModel[] =>
(Object.values(state.board.pieces) as PieceModel[]).filter(p => p.stage === stage);
export const getBoardPiecesExceptStage =
(state: PlayerPiecesState, stage: number): PieceModel[] =>
(Object.values(state.board.pieces) as PieceModel[]).filter(p => p.stage !== stage);
export const getBenchPiecesByStage =
(state: PlayerPiecesState, stage: number): PieceModel[] => state.bench.pieces.filter(p => p && p.stage === stage);
export const getBoardPieceCount = (state: PlayerPiecesState): number => Object.values(state.board.pieces).length;
export const hasSpaceOnBench = (state: PlayerPiecesState): boolean => getFirstEmptyBenchSlot(state) !== null;
export const getFirstEmptyBenchSlot = (state: PlayerPiecesState): number => {
  const index = state.bench.pieces.findIndex(p => p === null);

  if (index === -1) {
    return null;
  }

  return index;
};
