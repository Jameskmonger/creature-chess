import { BoardPokemonPiece } from "@common/pokemon-piece";
import { PIECE_SELECTED, PIECE_MOVED_TO_BOARD, PIECES_UPDATED } from "../actiontypes/pieceActionTypes";
import { TileCoordinates } from "@common/position";

export type PiecesAction =
    ({ type: PIECE_SELECTED, payload: BoardPokemonPiece })
  | ({ type: PIECES_UPDATED, payload: BoardPokemonPiece[] })
  | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: BoardPokemonPiece, position: TileCoordinates, benched: boolean } });

export const pieceSelected = (payload: BoardPokemonPiece) => ({
    type: PIECE_SELECTED,
    payload
});

export const pieceMovedToBoard = (piece: BoardPokemonPiece, position: TileCoordinates) => ({
    type: PIECE_MOVED_TO_BOARD,
    payload: {
        piece,
        position
    }
});

export const piecesUpdated = (payload: BoardPokemonPiece[]) => ({
    type: PIECES_UPDATED,
    payload
});
