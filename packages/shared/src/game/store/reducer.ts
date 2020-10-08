import { GameEvent, GAME_PHASE_STARTED_EVENT } from "./events";
import { GameState } from "./state";

export const initialState: GameState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null,
};

export function reducer(state: GameState = initialState, command: GameEvent): GameState {
    switch (command.type) {
        case GAME_PHASE_STARTED_EVENT:
            if (command.payload.round) {
                return {
                    ...state,
                    phase: command.payload.phase,
                    phaseStartedAtSeconds: Math.floor(command.payload.startedAt),
                    round: command.payload.round
                };
            }

            return {
                ...state,
                phase: command.payload.phase,
                phaseStartedAtSeconds: Math.floor(command.payload.startedAt)
            };
        default:
            return state;
    }
}
