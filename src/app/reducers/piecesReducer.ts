import { PokemonPiece, makeEnemy, makeFriendly } from "@common/pokemon-piece";
import { PiecesAction } from "../actions/pieceActions";
import { PIECE_SELECTED } from "../actiontypes/pieceActionTypes";
import { Reducer } from "react";

const initialState = [];

export const pieces: Reducer<PokemonPiece[], PiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case PIECE_SELECTED:
            return state.map(piece => ({ ...piece, selected: piece.id === action.payload.id }));
        default: {
            return state;
        }
    }
};
