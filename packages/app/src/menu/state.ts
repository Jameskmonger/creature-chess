import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MenuState = {
	loading: boolean,
	error?: string
};

const initialState: MenuState = {
	loading: false,
	error: null
}

export const { reducer, actions: { startLoading, finishLoading } } = createSlice({
	name: "menu",
	initialState,
	reducers: {
		startLoading: (state) => ({ ...state, loading: true }),
		finishLoading: (state, { payload: error = null }: PayloadAction<string | null>) =>
			({ ...state, loading: false, error })
	}
})
