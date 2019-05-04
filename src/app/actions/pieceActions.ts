import { PokemonPiece } from "@common/pokemon-piece";
import { PIECE_SELECTED, PIECE_MOVED_TO_BOARD, PIECES_UPDATED } from "../actiontypes/pieceActionTypes";
import { TileCoordinates } from "@common/position";

export type PiecesAction =
    ({ type: PIECE_SELECTED, payload: PokemonPiece })
  | ({ type: PIECES_UPDATED, payload: PokemonPiece[] })
  | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: PokemonPiece, position: TileCoordinates } });

export const pieceSelected = (payload: PokemonPiece) => ({
    type: PIECE_SELECTED,
    payload
});

export const pieceMovedToBoard = (piece: PokemonPiece, position: TileCoordinates) => ({
    type: PIECE_MOVED_TO_BOARD,
    payload: {
        piece,
        position
    }
});

export const piecesUpdated = (payload: PokemonPiece[]) => ({
    type: PIECES_UPDATED,
    payload
});
