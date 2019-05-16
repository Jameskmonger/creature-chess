import { PokemonPiece } from "@common/pokemon-piece";
import { TileCoordinates } from "@common/position";
import { BENCH_PIECES_UPDATED } from "./benchActionTypes";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "./boardActionTypes";

export type BenchPiecesAction =
    ({ type: BENCH_PIECES_UPDATED, payload: PokemonPiece[] })
  | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: PokemonPiece, position: TileCoordinates } })
  | ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: PokemonPiece, slot: number } })
  | ({ type: SELL_PIECE, payload: { pieceId: string } });

export const benchPiecesUpdated = (payload: PokemonPiece[]) => ({
    type: BENCH_PIECES_UPDATED,
    payload
});
