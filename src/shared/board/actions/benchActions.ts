import { Models } from "@common";
import { TileCoordinates } from "@common/position";
import { BENCH_PIECES_UPDATED, BENCH_PIECE_ADDED } from "./benchActionTypes";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "./boardActionTypes";

type BenchPiecesUpdatedAction = ({ type: BENCH_PIECES_UPDATED, payload: Models.Piece[] });
export type BenchPieceAddedAction = ({ type: BENCH_PIECE_ADDED, payload: { piece: Models.Piece }});

export type BenchPiecesAction =
  BenchPiecesUpdatedAction
  | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: Models.Piece, position: TileCoordinates } })
  | ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: Models.Piece, slot: number } })
  | ({ type: SELL_PIECE, payload: { pieceId: string } })
  | BenchPieceAddedAction;

export const benchPiecesUpdated = (payload: Models.Piece[]): BenchPiecesUpdatedAction => ({
  type: BENCH_PIECES_UPDATED,
  payload
});

export const benchPieceAdded = (piece: Models.Piece): BenchPieceAddedAction => ({
  type: BENCH_PIECE_ADDED,
  payload: {
    piece
  }
});
