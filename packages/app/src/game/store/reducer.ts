import {
    GameAction,
    ENABLE_DEBUG_MODE, UPDATE_CONNECTION_STATUS, JOIN_COMPLETE
} from "./actions";
import { GameState } from "./state";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";

export const initialState: GameState = {
    id: null,
    round: null,
    debug: false,
    connectionStatus: ConnectionStatus.NOT_CONNECTED
};

export function reducer(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                ...state,
                id: action.payload.gameId
            };
        case UPDATE_CONNECTION_STATUS:
            return {
                ...state,
                connectionStatus: action.payload.status
            };
        case GAME_PHASE_UPDATE:
            if (action.payload.phase === GamePhase.PREPARING) {
                return {
                    ...state,
                    round: action.payload.payload.round
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
