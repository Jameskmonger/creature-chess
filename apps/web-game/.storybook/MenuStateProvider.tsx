import React from "react";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MenuState } from "~/store/menu/state";
import { useGlobalStyles } from "~/styles";

export function MenuStateProvider({ children }: { children: React.ReactNode }) {
	useGlobalStyles();

	const store = configureStore({
		reducer: createSlice({
			name: "mock slice",
			initialState: {
				menu: {
					loadingMessage: null,
				} as MenuState,
			},
			reducers: {},
		}).reducer,
	});

	return <Provider store={store}>{children}</Provider>;
}
