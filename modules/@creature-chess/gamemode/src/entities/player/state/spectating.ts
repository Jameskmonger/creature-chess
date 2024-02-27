import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SpectatingState = {
	id: string | null;
};

const initialState: SpectatingState = {
	id: null,
};

const { actions, reducer: spectatingReducer } = createSlice({
	name: "spectating",
	initialState,
	reducers: {
		setSpectatingIdCommand: (
			state,
			{ payload: id }: PayloadAction<string | null>
		) => ({
			...state,
			id,
		}),
	},
});

export const setSpectatingIdCommand = actions.setSpectatingIdCommand;

export { spectatingReducer };
