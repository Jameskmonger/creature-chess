import { Reducer } from "react";
import { Models } from "@common";
import { pieceUtils } from "@common/utils";
import { BoardAction } from "./boardActions";
import { PIECE_MOVED_TO_BOARD, PIECES_UPDATED, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "./boardActionTypes";

const initialState = [];

export const boardReducer: Reducer<Models.Piece[], BoardAction> = (state = initialState, action) => {
    switch (action.type) {
        case PIECES_UPDATED:
            return action.payload.pieces;
        case PIECE_MOVED_TO_BOARD:
            const target = {
                ...action.payload.piece,
                position: action.payload.position
            };

            return pieceUtils.moveOrAddPiece(state, target);
        case PIECE_MOVED_TO_BENCH:
            return state.filter(s => s.id !== action.payload.piece.id);
        case SELL_PIECE:
            return state.filter(piece => piece.id !== action.payload.pieceId);
        default: {
            return state;
        }
    }
};
