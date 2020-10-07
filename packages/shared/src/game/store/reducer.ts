import { GameCommand, START_GAME_PHASE_COMMAND } from "./commands";
import { GameState } from "./state";

export const initialState: GameState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null,
};

export function reducer(state: GameState = initialState, command: GameCommand): GameState {
    switch (command.type) {
        case START_GAME_PHASE_COMMAND:
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
