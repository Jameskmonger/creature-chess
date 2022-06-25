import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BotState {
	ambition: number;
	competency: number;
	composure: number;
	vision: number;
}

const initialState: BotState = {
	ambition: 100,
	competency: 100,
	composure: 100,
	vision: 100,
};

const { actions, reducer: botInfoReducer } = createSlice({
	name: "botInfo",
	initialState,
	reducers: {
		updateAmbitionCommand: (
			state,
			{ payload: ambitionValue }: PayloadAction<number>
		) => ({
			...state,
			ambition: ambitionValue,
		}),
		updateCompetencyCommand: (
			state,
			{ payload: competencyValue }: PayloadAction<number>
		) => ({
			...state,
			competency: competencyValue,
		}),
		updateComposureCommand: (
			state,
			{ payload: composureValue }: PayloadAction<number>
		) => ({
			...state,
			composure: composureValue,
		}),
		updateVisionCommand: (
			state,
			{ payload: visionValue }: PayloadAction<number>
		) => ({
			...state,
			vision: visionValue,
		}),
	},
});

export { botInfoReducer, actions as botInfoActions };
