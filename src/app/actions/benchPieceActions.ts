import { PokemonPiece } from "@common/pokemon-piece";
import { BENCH_PIECE_MOVED, BENCH_PIECES_UPDATED } from "../actiontypes/benchPieceActionTypes";
import { TileCoordinates } from "@common/position";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "../actiontypes/pieceActionTypes";

export type BenchPiecesAction =
    ({ type: BENCH_PIECES_UPDATED, payload: PokemonPiece[] })
  | ({ type: BENCH_PIECE_MOVED, payload: { piece: PokemonPiece, position: TileCoordinates } })
  | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: PokemonPiece, position: TileCoordinates } })
  | ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: PokemonPiece, slot: number } })
  | ({ type: SELL_PIECE, payload: { pieceId: string } });

export const benchPiecesUpdated = (payload: PokemonPiece[]) => ({
    type: BENCH_PIECES_UPDATED,
    payload
});
