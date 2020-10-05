import {
    GameAction,
    ENABLE_DEBUG_MODE, FIND_GAME, UPDATE_CONNECTION_STATUS, PHASE_START_SECONDS, JOIN_COMPLETE
} from "./actions";
import { GameState } from "./state";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";
import { READY_UP } from "@creature-chess/shared/player/actions";

export const initialState: GameState = {
    localPlayerId: null,
    ready: false,
    opponentId: null,
    loading: false,
    phaseStartedAtSeconds: null,
    round: null,
    debug: false,
    connectionStatus: ConnectionStatus.NOT_CONNECTED
};

export function reducer(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                ...state,
                localPlayerId: action.payload.playerId,
                ready: false
            };
        case READY_UP:
            return {
                ...state,
                ready: true
            };
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
                    opponentId: action.payload.payload.opponentId,
                    ready: false
                };
            }

            // clear opponent id when entering preparing phase
            if (action.payload.phase === GamePhase.PREPARING) {
                return {
                    ...state,
                    round: action.payload.payload.round,
                    opponentId: null
                };
            }

            return state;
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
