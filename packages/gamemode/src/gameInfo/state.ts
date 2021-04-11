import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GamePhase } from "@creature-chess/models";

export type GameInfoState = {
    round: number | null;
    phase: GamePhase | null;
    phaseStartedAtSeconds: number;
};

const initialState: GameInfoState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null,
};

const { reducer, actions: { setGameInfoCommand } } = createSlice({
    name: "gameInfo",
    initialState,
    reducers: {
        setGameInfoCommand: (state, command: PayloadAction<{ phase: GamePhase, startedAt: number, round?: number }>) => {
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
            }
        }
    }
});

const GameInfoCommands = { setGameInfoCommand };

export { reducer, GameInfoCommands };
