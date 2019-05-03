import { BenchPokemonPiece } from "@common/pokemon-piece";
import { BENCH_PIECE_SELECTED, BENCH_PIECE_MOVED, BENCH_PIECES_UPDATED } from "../actiontypes/benchPieceActionTypes";

export type BenchPiecesAction =
    ({ type: BENCH_PIECE_SELECTED, payload: BenchPokemonPiece })
  | ({ type: BENCH_PIECES_UPDATED, payload: BenchPokemonPiece[] })
  | ({ type: BENCH_PIECE_MOVED, payload: { piece: BenchPokemonPiece, slot: number } });

export const benchPieceSelected = (payload: BenchPokemonPiece) => ({
    type: BENCH_PIECE_SELECTED,
    payload
});

export const benchPieceMoved = (piece: BenchPokemonPiece, slot: number) => ({
    type: BENCH_PIECE_MOVED,
    payload: {
        piece,
        slot
    }
});

export const benchPiecesUpdated = (payload: BenchPokemonPiece[]) => ({
    type: BENCH_PIECES_UPDATED,
    payload
});
