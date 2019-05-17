import { PokemonPiece } from "@common/pokemon-piece";
import { TileCoordinates } from "@common/position";
import { BENCH_PIECES_UPDATED, BENCH_PIECE_ADDED } from "./benchActionTypes";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "./boardActionTypes";

type BenchPiecesUpdatedAction = ({ type: BENCH_PIECES_UPDATED, payload: PokemonPiece[] });
type BenchPieceAddedAction = ({ type: BENCH_PIECE_ADDED, payload: { piece: PokemonPiece }});

export type BenchPiecesAction =
  BenchPiecesUpdatedAction
  | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: PokemonPiece, position: TileCoordinates } })
  | ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: PokemonPiece, slot: number } })
  | ({ type: SELL_PIECE, payload: { pieceId: string } })
  | BenchPieceAddedAction;

export const benchPiecesUpdated = (payload: PokemonPiece[]): BenchPiecesUpdatedAction => ({
  type: BENCH_PIECES_UPDATED,
  payload
});

export const benchPieceAdded = (piece: PokemonPiece): BenchPieceAddedAction => ({
  type: BENCH_PIECE_ADDED,
  payload: {
    piece
  }
});
