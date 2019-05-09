import { PokemonPiece, moveOrAddPiece } from "@common/pokemon-piece";
import { BenchPiecesAction } from "../actions/benchPieceActions";
import { BENCH_PIECE_MOVED, BENCH_PIECES_UPDATED } from "../actiontypes/benchPieceActionTypes";
import { Reducer } from "react";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH } from "../actiontypes/pieceActionTypes";
import { createTileCoordinates } from "@common/position";

const initialState = [];

export const benchPieces: Reducer<PokemonPiece[], BenchPiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case BENCH_PIECES_UPDATED:
            return action.payload;
        case PIECE_MOVED_TO_BENCH:
            const target = {
                ...action.payload.piece,
                position: createTileCoordinates(action.payload.slot, null)
            };

            return moveOrAddPiece(state, target);
        case PIECE_MOVED_TO_BOARD:
            return state.filter(s => s.id !== action.payload.piece.id);
        case BENCH_PIECE_MOVED:
            return state.map(piece => {
                if (piece.id === action.payload.piece.id) {
                    return { ...piece, position: action.payload.position };
                }
                return piece;
            });
        default: {
            return state;
        }
    }
};
