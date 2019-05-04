import { BoardPokemonPiece } from "@common/pokemon-piece";
import { PIECE_SELECTED, PIECE_MOVED, PIECES_UPDATED } from "../actiontypes/pieceActionTypes";
import { TileCoordinates } from "@common/position";

export type PiecesAction =
    ({ type: PIECE_SELECTED, payload: BoardPokemonPiece })
  | ({ type: PIECES_UPDATED, payload: BoardPokemonPiece[] })
  | ({ type: PIECE_MOVED, payload: { piece: BoardPokemonPiece, position: TileCoordinates, benched: boolean } });

export const pieceSelected = (payload: BoardPokemonPiece) => ({
    type: PIECE_SELECTED,
    payload
});

export const pieceMoved = (piece: BoardPokemonPiece, position: TileCoordinates, benched: boolean = false) => ({
    type: PIECE_MOVED,
    payload: {
        piece,
        position,
        benched
    }
});

export const piecesUpdated = (payload: BoardPokemonPiece[]) => ({
    type: PIECES_UPDATED,
    payload
});
