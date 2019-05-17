import { Reducer } from "react";
import { PokemonPiece, moveOrAddPiece } from "@common/pokemon-piece";
import { createTileCoordinates } from "@common/position";
import { BenchPiecesAction } from "./benchActions";
import { BENCH_PIECES_UPDATED } from "./benchActionTypes";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "./boardActionTypes";

const initialState = [];

export const benchReducer: Reducer<PokemonPiece[], BenchPiecesAction> = (state = initialState, action) => {
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
        case SELL_PIECE:
            return state.filter(piece => piece.id !== action.payload.pieceId);
        default: {
            return state;
        }
    }
};
