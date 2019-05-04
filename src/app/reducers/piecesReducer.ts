import { PokemonPiece, moveOrAddPiece } from "@common/pokemon-piece";
import { PiecesAction } from "../actions/pieceActions";
import { PIECE_MOVED_TO_BOARD, PIECES_UPDATED, PIECE_MOVED_TO_BENCH } from "../actiontypes/pieceActionTypes";
import { Reducer } from "react";

const initialState = [];

export const pieces: Reducer<PokemonPiece[], PiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case PIECES_UPDATED:
            return action.payload;
        case PIECE_MOVED_TO_BOARD:
            const target = {
                ...action.payload.piece,
                position: action.payload.position
            };

            return moveOrAddPiece(state, target);
        case PIECE_MOVED_TO_BENCH:
            return state.filter(s => s.id !== action.payload.piece.id);
        default: {
            return state;
        }
    }
};
