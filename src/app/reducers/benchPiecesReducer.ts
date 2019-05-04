import { PokemonPiece } from "@common/pokemon-piece";
import { BenchPiecesAction } from "../actions/benchPieceActions";
import { BENCH_PIECE_SELECTED, BENCH_PIECE_MOVED, BENCH_PIECES_UPDATED } from "../actiontypes/benchPieceActionTypes";
import { Reducer } from "react";
import { PIECE_MOVED_TO_BOARD } from "../actiontypes/pieceActionTypes";

const initialState = [];

export const benchPieces: Reducer<PokemonPiece[], BenchPiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case BENCH_PIECES_UPDATED:
            return action.payload;
        case PIECE_MOVED_TO_BOARD:
            return state.filter(s => s.id !== action.payload.piece.id);
        case BENCH_PIECE_SELECTED:
        case BENCH_PIECE_MOVED:
            return state.map(s => benchPiece(s, action));
        default: {
            return state;
        }
    }
};

const benchPiece: Reducer<PokemonPiece, BenchPiecesAction> = (state, action) => {
    switch (action.type) {
        case BENCH_PIECE_SELECTED:
            if (state.id === action.payload.id) {
                return { ...state, selected: true };
            }
            if (state.selected && state.id !== action.payload.id) {
                return { ...state, selected: false };
            }
            return state;
        case BENCH_PIECE_MOVED:
            if (state.id === action.payload.piece.id) {
                return { ...state, position: action.payload.position };
            }
            return state;
        default:
            return state;
    }
};
