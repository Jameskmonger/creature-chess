import { GameAction, JOIN_COMPLETE, PHASE_START_SECONDS } from "./actions";
import { GameState } from "./state";
import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";

export const initialState: GameState = {
    id: null,
    round: null,
    phase: GamePhase.WAITING,
    phaseStartedAtSeconds: null,
};

export function reducer(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                ...state,
                id: action.payload.gameId
            };
        case GAME_PHASE_UPDATE:
            if (action.payload.phase === GamePhase.PREPARING) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    round: action.payload.payload.round
                };
            }

            return {
                ...state,
                phase: action.payload.phase
            };
        case PHASE_START_SECONDS:
            return {
                ...state,
                phaseStartedAtSeconds: action.payload.time
            };
        default:
            return state;
    }
}
