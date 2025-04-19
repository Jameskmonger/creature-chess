import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MenuState = {
	loadingMessage: string | null;
};

const initialState: MenuState = {
	loadingMessage: null,
};

export const { reducer: menuReducer, actions: MenuCommands } = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setLoadingMessage: (
			state: MenuState,
			action: PayloadAction<string | null>
		) => {
			state.loadingMessage = action.payload;
		},
		clearLoadingMessage: (state: MenuState) => {
			state.loadingMessage = null;
		},
	},
});
