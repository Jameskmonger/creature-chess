import { Reducer } from "react";
import { Models } from "@common";
import { pieceUtils } from "@common/utils";
import { createTileCoordinates } from "@common/position";
import { BenchPiecesAction } from "./benchActions";
import { BENCH_PIECES_UPDATED, BENCH_PIECE_ADDED } from "./benchActionTypes";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "./boardActionTypes";

const initialState = [];

export const benchReducer: Reducer<Models.Piece[], BenchPiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case BENCH_PIECES_UPDATED:
            return action.payload;
        case BENCH_PIECE_ADDED:
            return [...state, action.payload.piece];
        case PIECE_MOVED_TO_BENCH:
            const target = {
                ...action.payload.piece,
                position: createTileCoordinates(action.payload.slot, null)
            };

            return pieceUtils.moveOrAddPiece(state, target);
        case PIECE_MOVED_TO_BOARD:
            return state.filter(s => s.id !== action.payload.piece.id);
        case SELL_PIECE:
            return state.filter(piece => piece.id !== action.payload.pieceId);
        default: {
            return state;
        }
    }
};
