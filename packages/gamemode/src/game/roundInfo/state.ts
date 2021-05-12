import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GamePhase } from "@creature-chess/models";

export type RoundInfoState = {
    round: number | null;
    phase: GamePhase | null;
    phaseStartedAtSeconds: number | null;
};

const initialState: RoundInfoState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null,
};

export const { reducer, actions: { setRoundInfoCommand } } = createSlice({
    name: "roundInfo",
    initialState,
    reducers: {
        setRoundInfoCommand: (state, command: PayloadAction<{ phase: GamePhase, startedAt: number, round?: number }>) => {
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
        }
    }
});

export type SetRoundInfoCommand = ReturnType<typeof setRoundInfoCommand>;

const RoundInfoCommands = { setRoundInfoCommand };

export { RoundInfoCommands };
