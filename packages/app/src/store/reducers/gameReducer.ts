import { GameAction } from "../actions/gameActions";
import {
    JOIN_ERROR, ENABLE_DEBUG_MODE, FIND_GAME, UPDATE_ANNOUNCEMENT,
    CLEAR_ANNOUNCEMENT, SHOP_LOCK_UPDATED, UPDATE_CONNECTION_STATUS, FINISH_GAME, PHASE_START_SECONDS
} from "../actiontypes/gameActionTypes";
import { GameState } from "../state";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";

export const initialState: GameState = {
    opponentId: null,
    loading: false,
    menuError: null,
    phase: GamePhase.WAITING,
    phaseStartedAtSeconds: null,
    round: null,
    debug: false,
    mainAnnouncement: null,
    subAnnouncement: null,
    connectionStatus: ConnectionStatus.NOT_CONNECTED,
    shopLocked: false
};

export function game(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
        case UPDATE_CONNECTION_STATUS:
            return {
                ...state,
                connectionStatus: action.payload.status
            };
        case FIND_GAME:
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
                menuError: null
            };
        case PHASE_START_SECONDS:
            return {
                ...state,
                phaseStartedAtSeconds: action.payload.time
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
        case ENABLE_DEBUG_MODE: {
            return {
                ...state,
                debug: true
            };
        }
        case UPDATE_ANNOUNCEMENT: {
            return {
                ...state,
                mainAnnouncement: action.payload.main,
                subAnnouncement: action.payload.sub
            };
        }
        case CLEAR_ANNOUNCEMENT: {
            return {
                ...state,
                mainAnnouncement: null,
                subAnnouncement: null
            };
        }
        case SHOP_LOCK_UPDATED: {
            return {
                ...state,
                shopLocked: action.payload.locked
            };
        }
        default:
            return state;
    }
}
