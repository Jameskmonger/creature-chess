import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SpectatingState = {
	id: string | null;
};

const initialState: SpectatingState = {
	id: null
};

const {
	actions,
	reducer: spectatingReducer,
} = createSlice({
	name: "spectating",
	initialState,
	reducers: {
		setSpectatingIdCommand: (state, { payload: id }: PayloadAction<string | null>) => ({
			...state,
			id
		})
	}
});

// this stops the compiler from trying to export a type from @reduxjs/toolkit
const setSpectatingIdCommand: (payload: string | null) => ({ type: string; payload: string | null })
	= actions.setSpectatingIdCommand;

export { setSpectatingIdCommand, spectatingReducer };
