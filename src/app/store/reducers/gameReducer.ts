import { GameAction } from "../actions/gameActions";
import { JOIN_GAME, GAME_PHASE_UPDATE, MONEY_UPDATE, PHASE_TIMER_UPDATED, CREATE_GAME, JOIN_ERROR, ENABLE_DEBUG_MODE, FIND_GAME } from "../actiontypes/gameActionTypes";
import { GameState } from "../state";
import { GamePhase } from "@common";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";

const initialState: GameState = {
    gameId: null,
    opponentId: null,
    loading: false,
    menuError: null,
    money: 0,
    phase: GamePhase.WAITING,
    phaseTimer: null,
    round: null,
    debug: false
};

export function game(state: GameState = initialState, action: GameAction) {
    switch (action.type) {
        case FIND_GAME:
        case JOIN_GAME:
        case CREATE_GAME:
            return {
                ...state,
                loading: true
            };
        case JOIN_ERROR:
            return {
                ...state,
                loading: false,
                menuError: action.payload.error
            };
        case JOIN_COMPLETE:
            return {
                ...state,
                loading: false,
                menuError: null,
                gameId: action.payload.gameId
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
                    round: action.payload.payload.round,
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
        case ENABLE_DEBUG_MODE: {
            return {
                ...state,
                debug: true
            };
        }
        default:
            return state;
    }
}
