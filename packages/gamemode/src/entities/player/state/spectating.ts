import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SpectatingState = {
	id: string | null;
};

const initialState: SpectatingState = {
	id: null
};

export const {
	actions: { setSpectatingIdCommand },
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
