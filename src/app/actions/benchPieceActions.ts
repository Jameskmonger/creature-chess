import { PokemonPiece } from "@common/pokemon-piece";
import { BENCH_PIECE_SELECTED, BENCH_PIECE_MOVED, BENCH_PIECES_UPDATED } from "../actiontypes/benchPieceActionTypes";
import { TileCoordinates } from "../../shared/position";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH } from "../actiontypes/pieceActionTypes";

export type BenchPiecesAction =
    ({ type: BENCH_PIECE_SELECTED, payload: PokemonPiece })
  | ({ type: BENCH_PIECES_UPDATED, payload: PokemonPiece[] })
  | ({ type: BENCH_PIECE_MOVED, payload: { piece: PokemonPiece, position: TileCoordinates } })
  | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: PokemonPiece, position: TileCoordinates } })
  | ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: PokemonPiece, slot: number } });

export const benchPieceSelected = (payload: PokemonPiece) => ({
    type: BENCH_PIECE_SELECTED,
    payload
});

export const benchPiecesUpdated = (payload: PokemonPiece[]) => ({
    type: BENCH_PIECES_UPDATED,
    payload
});
