import { PokemonPiece } from "@common/pokemon-piece";
import { BENCH_PIECE_SELECTED, BENCH_PIECE_MOVED, BENCH_PIECES_UPDATED } from "../actiontypes/benchPieceActionTypes";
import { TileCoordinates } from "../../shared/position";

export type BenchPiecesAction =
    ({ type: BENCH_PIECE_SELECTED, payload: PokemonPiece })
  | ({ type: BENCH_PIECES_UPDATED, payload: PokemonPiece[] })
  | ({ type: BENCH_PIECE_MOVED, payload: { piece: PokemonPiece, position: TileCoordinates } });

export const benchPieceSelected = (payload: PokemonPiece) => ({
    type: BENCH_PIECE_SELECTED,
    payload
});

export const benchPiecesUpdated = (payload: PokemonPiece[]) => ({
    type: BENCH_PIECES_UPDATED,
    payload
});
