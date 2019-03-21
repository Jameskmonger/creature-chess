import { PokemonPiece, PiecePosition } from "@common/pokemon-piece";
import { PIECE_SELECTED, PIECE_MOVED, PIECES_UPDATED } from "../actiontypes/pieceActionTypes";

export type PiecesAction =
    ({ type: PIECE_SELECTED, payload: PokemonPiece })
  | ({ type: PIECES_UPDATED, payload: PokemonPiece[] })
  | ({ type: PIECE_MOVED, payload: { piece: PokemonPiece, position: PiecePosition } });

export const pieceSelected = (payload: PokemonPiece) => ({
    type: PIECE_SELECTED,
    payload
});

export const pieceMoved = (piece: PokemonPiece, position: PiecePosition) => ({
    type: PIECE_MOVED,
    payload: {
        piece,
        position
    }
});

export const piecesUpdated = (payload: PokemonPiece[]) => ({
    type: PIECES_UPDATED,
    payload
});
