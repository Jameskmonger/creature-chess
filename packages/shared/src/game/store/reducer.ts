import { GameAction, START_GAME_PHASE_COMMAND } from "./actions";
import { GameState } from "./state";

export const initialState: GameState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null,
};

export function reducer(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
        case START_GAME_PHASE_COMMAND:
            if (action.payload.round) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    phaseStartedAtSeconds: Math.floor(action.payload.startedAt),
                    round: action.payload.round
                };
            }

            return {
                ...state,
                phase: action.payload.phase,
                phaseStartedAtSeconds: Math.floor(action.payload.startedAt)
            };
        default:
            return state;
    }
}
