import { GameAction } from "../actions/gameActions";
import { JOIN_COMPLETE, JOIN_GAME, GAME_STATE_UPDATE, MONEY_UPDATE, PIECE_SELECTED, BANNER_UPDATED } from "../actiontypes/gameActionTypes";
import { GameState } from "../store/store";
import { GamePhase } from "../../shared";

const initialState: GameState = {
    localPlayerId: null,
    opponentId: null,
    loading: false,
    money: 0,
    selectedPiece: null,
    bannerMessage: null
};

export function game(state: GameState = initialState, action: GameAction) {
    switch (action.type) {
        case JOIN_GAME:
            return {
                ...state,
                loading: true,
                localPlayerId: null
            };
        case JOIN_COMPLETE:
            return {
                ...state,
                loading: false,
                localPlayerId: action.payload.id
            };
        case GAME_STATE_UPDATE:
            if (action.payload.phase === GamePhase.READY) {
                return {
                    ...state,
                    opponentId: action.payload.payload.opponentId
                };
            }

            return state;
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case PIECE_SELECTED:
            return {
                ...state,
                selectedPiece: action.payload.piece
            };
        case BANNER_UPDATED:
            return {
                ...state,
                bannerMessage: action.payload.message
            };
        default:
            return state;
    }
}
