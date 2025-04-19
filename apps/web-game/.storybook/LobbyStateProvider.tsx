import React from "react";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { LobbyState } from "../src/store/lobby/state";
import { useGlobalStyles } from "../src/styles";

export function LobbyStateProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useGlobalStyles();

	const store = configureStore({
		reducer: createSlice({
			name: "mock slice",
			initialState: {
				lobby: {
					startTimestamp: Date.now() + 60_000,
					maxPlayers: 8,
					players: [],
					lobbyWaitTimeSeconds: 60,
					settings: GamemodeSettingsPresets["default"],
				} as LobbyState,
			},
			reducers: {},
		}).reducer,
	});

	return <Provider store={store}>{children}</Provider>;
}
