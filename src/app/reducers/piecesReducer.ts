import { PokemonPiece, isSamePiece } from "@common/pokemon-piece";
import { PiecesAction } from "../actions/pieceActions";
import { PIECE_SELECTED, PIECE_MOVED, PIECES_UPDATED } from "../actiontypes/pieceActionTypes";
import { Reducer } from "react";

const initialState = [];

export const pieces: Reducer<PokemonPiece[], PiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case PIECES_UPDATED:
            return action.payload;
        case PIECE_SELECTED:
        case PIECE_MOVED:
            return state.map(s => piece(s, action));
        default: {
            return state;
        }
    }
};

const piece: Reducer<PokemonPiece, PiecesAction> = (state, action) => {
    switch (action.type) {
        case PIECE_SELECTED:
            if (state.id === action.payload.id) {
                return { ...state, selected: true };
            }
            if (state.selected && state.id !== action.payload.id) {
                return { ...state, selected: false };
            }
            return state;
        case PIECE_MOVED:
            if (state.id === action.payload.piece.id) {
                return { ...state, position: action.payload.position };
            }
            return state;
        default:
            return state;
    }
};
