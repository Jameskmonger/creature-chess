import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GamePhase, RoundInfoState } from "@creature-chess/models";

import { gamePhaseStartedEvent } from "../events";

const initialState: RoundInfoState = {
	round: 1,
	phase: GamePhase.PREPARING,
	phaseStartedAtSeconds: 0,
};

const applyPhaseUpdate = (
	state: RoundInfoState,
	payload: { phase: GamePhase; startedAt: number; round?: number }
): RoundInfoState => {
	if (payload.round) {
		return {
			...state,
			phase: payload.phase,
			phaseStartedAtSeconds: Math.floor(payload.startedAt),
			round: payload.round,
		};
	}

	return {
		...state,
		phase: payload.phase,
		phaseStartedAtSeconds: Math.floor(payload.startedAt),
	};
};

export const {
	reducer,
	actions: { setRoundInfoCommand },
} = createSlice({
	name: "roundInfo",
	initialState,
	reducers: {
		setRoundInfoCommand: (
			state,
			command: PayloadAction<{
				phase: GamePhase;
				startedAt: number;
				round?: number;
			}>
		) => applyPhaseUpdate(state, command.payload),
	},
	extraReducers: (builder) => {
		builder.addCase(gamePhaseStartedEvent, (state, action) =>
			applyPhaseUpdate(state, action.payload)
		);
	},
});

export type SetRoundInfoCommand = ReturnType<typeof setRoundInfoCommand>;

const RoundInfoCommands = { setRoundInfoCommand };

export { RoundInfoCommands };
