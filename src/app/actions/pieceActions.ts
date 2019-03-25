import { PokemonPiece } from "@common/pokemon-piece";
import { PIECE_SELECTED, PIECE_MOVED, PIECES_UPDATED } from "../actiontypes/pieceActionTypes";
import { TileCoordinates } from "@common/position";

export type PiecesAction =
    ({ type: PIECE_SELECTED, payload: PokemonPiece })
  | ({ type: PIECES_UPDATED, payload: PokemonPiece[] })
  | ({ type: PIECE_MOVED, payload: { piece: PokemonPiece, position: TileCoordinates, benched: boolean } });

export const pieceSelected = (payload: PokemonPiece) => ({
    type: PIECE_SELECTED,
    payload
});

export const pieceMoved = (piece: PokemonPiece, position: TileCoordinates, benched: boolean = false) => ({
    type: PIECE_MOVED,
    payload: {
        piece,
        position,
        benched
    }
});

export const piecesUpdated = (payload: PokemonPiece[]) => ({
    type: PIECES_UPDATED,
    payload
});
