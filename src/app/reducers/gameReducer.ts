import { GameAction } from "../actions/gameActions";
import { JOIN_COMPLETE, JOIN_GAME, GAME_STATE_PLAYING } from "../actiontypes/gameActionTypes";
import { GameState } from "../store/store";

const initialState: GameState = {
    localPlayerId: null,
    opponentId: null,
    loading: false
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
        case GAME_STATE_PLAYING:
            return {
                ...state,
                opponentId: action.payload.opponentId
            };
        default:
            return state;
    }
}
