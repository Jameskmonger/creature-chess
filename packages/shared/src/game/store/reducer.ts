import { GameEvent, GAME_PHASE_STARTED_EVENT } from "./events";
import { GameInfoState } from "./state";

export const initialState: GameInfoState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null,
};

export function reducer(state: GameInfoState = initialState, command: GameEvent): GameInfoState {
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
