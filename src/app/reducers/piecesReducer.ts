import { PokemonPiece, makeEnemy, makeFriendly } from "@common/pokemon-piece";
import { PiecesAction } from "../actions/pieceActions";
import { PIECE_SELECTED } from "../actiontypes/pieceActionTypes";
import { Reducer } from "react";

const initialState = [
    makeEnemy(77, [0, 0]),
    makeEnemy(15, [1, 0]),
    makeEnemy(123, [4, 0]),
    makeEnemy(58, [5, 0]),
    makeEnemy(6, [4, 3]),
    makeEnemy(11, [3, 1]),

    makeFriendly(129, [1, 6]),
    makeFriendly(62, [2, 6]),
    makeFriendly(9, [4, 4]),
    makeFriendly(70, [7, 6]),
    makeFriendly(67, [3, 3]),
    makeFriendly(89, [5, 3])
];

export const pieces: Reducer<PokemonPiece[], PiecesAction> = (state = initialState, action) => {
    switch (action.type) {
        case PIECE_SELECTED:
            return state.map(piece => ({ ...piece, selected: piece.id === action.payload.id }));
        default: {
            return state;
        }
    }
};
