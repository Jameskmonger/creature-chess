import { PokemonPiece } from "@common/pokemon-piece";
import { PIECE_SELECTED } from "../actiontypes/pieceActionTypes";

export type PiecesAction = { type: PIECE_SELECTED, payload: PokemonPiece };

export const pieceSelected = (payload: PokemonPiece) => ({
    type: PIECE_SELECTED,
    payload
});
