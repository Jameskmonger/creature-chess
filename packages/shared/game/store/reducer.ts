import { GameAction, PHASE_START_SECONDS, GAME_PHASE_UPDATE } from "./actions";
import { GamePhase } from "@creature-chess/models";
import { GameState } from "./state";

export const initialState: GameState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null,
};

export function reducer(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
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
