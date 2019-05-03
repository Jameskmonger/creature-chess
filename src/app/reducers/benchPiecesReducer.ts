import { BenchPokemonPiece } from "@common/pokemon-piece";
import { BenchPiecesAction } from "../actions/benchPieceActions";
import { BENCH_PIECE_SELECTED, BENCH_PIECE_MOVED, BENCH_PIECES_UPDATED } from "../actiontypes/benchPieceActionTypes";
import { Reducer } from "react";

const initialState = [];

export const benchPieces: Reducer<BenchPokemonPiece[], BenchPiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case BENCH_PIECES_UPDATED:
            return action.payload;
        case BENCH_PIECE_SELECTED:
        case BENCH_PIECE_MOVED:
            return state.map(s => benchPiece(s, action));
        default: {
            return state;
        }
    }
};

const benchPiece: Reducer<BenchPokemonPiece, BenchPiecesAction> = (state, action) => {
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
                return { ...state, position: action.payload.slot };
            }
            return state;
        default:
            return state;
    }
};
