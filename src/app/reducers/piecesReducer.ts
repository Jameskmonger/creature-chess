import { PokemonPiece, moveOrAddPiece } from "@common/pokemon-piece";
import { PiecesAction } from "../actions/pieceActions";
import { PIECE_MOVED_TO_BOARD, PIECES_UPDATED, PIECE_MOVED_TO_BENCH } from "../actiontypes/pieceActionTypes";
import { Reducer } from "react";
import { GAME_STATE_UPDATE } from "../actiontypes/gameActionTypes";
import { GameState } from "../../shared";

const initialState = [];

export const pieces: Reducer<PokemonPiece[], PiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case PIECES_UPDATED:
            return action.payload.pieces;
        case PIECE_MOVED_TO_BOARD:
            const target = {
                ...action.payload.piece,
                position: action.payload.position
            };

            return moveOrAddPiece(state, target);
        case PIECE_MOVED_TO_BENCH:
            return state.filter(s => s.id !== action.payload.piece.id);
        case GAME_STATE_UPDATE: {
            if (action.payload.phase === GameState.READY) {
                return action.payload.payload.pieces;
            }

            return state;
        }
        default: {
            return state;
        }
    }
};
