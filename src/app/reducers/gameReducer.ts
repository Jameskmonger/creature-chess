import { GameAction } from "../actions/gameActions";
import { JOIN_COMPLETE, JOIN_GAME } from "../actiontypes/gameActionTypes";
import { GameState } from "../store/store";

const initialState: GameState = {
    localPlayerId: null,
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
        default:
            return state;
    }
}
