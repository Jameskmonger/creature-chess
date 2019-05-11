import { GameAction } from "../actions/gameActions";
import { JOIN_GAME, GAME_PHASE_UPDATE, MONEY_UPDATE, PHASE_TIMER_UPDATED } from "../actiontypes/gameActionTypes";
import { GameState } from "../store/store";
import { GamePhase } from "@common";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";

const initialState: GameState = {
    opponentId: null,
    loading: false,
    money: 0,
    phase: GamePhase.WAITING,
    phaseTimer: null
};

export function game(state: GameState = initialState, action: GameAction) {
    switch (action.type) {
        case JOIN_GAME:
            return {
                ...state,
                loading: true
            };
        case JOIN_COMPLETE:
            return {
                ...state,
                loading: false
            };
        case GAME_PHASE_UPDATE:
            // set opponent id when entering ready phase
            if (action.payload.phase === GamePhase.READY) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    opponentId: action.payload.payload.opponentId
                };
            }

            // clear opponent id when entering preparing phase
            if (action.payload.phase === GamePhase.PREPARING) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    opponentId: null
                };
            }

            return {
                ...state,
                phase: action.payload.phase
            };
        case PHASE_TIMER_UPDATED:
            return {
                ...state,
                phaseTimer: action.payload.time
            };
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        default:
            return state;
    }
}
