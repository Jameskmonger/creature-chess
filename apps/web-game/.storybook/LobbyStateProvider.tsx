import React from "react";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { LobbyState } from "~/store/lobby/state";
import { useGlobalStyles } from "~/styles";

import { LobbyPlayer } from "@creature-chess/models/lobby";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

export function LobbyStateProvider({
	children,
	players,
}: {
	children: React.ReactNode;
	players?: LobbyPlayer[];
}) {
	useGlobalStyles();

	const store = configureStore({
		reducer: createSlice({
			name: "mock slice",
			initialState: {
				lobby: {
					startTimestamp: Date.now() + 60_000,
					maxPlayers: 8,
					players: players ?? [],
					lobbyWaitTimeSeconds: 60,
					settings: GamemodeSettingsPresets["default"],
				} as LobbyState,
			},
			reducers: {},
		}).reducer,
	});

	return <Provider store={store}>{children}</Provider>;
}
