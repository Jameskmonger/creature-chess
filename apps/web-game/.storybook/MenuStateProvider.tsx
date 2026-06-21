import React, { useRef } from "react";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { GameConnection } from "~/networking/GameConnection";
import { LobbyConnection } from "~/networking/LobbyConnection";
import { SocketManagerProvider } from "~/networking/context";
import { MenuState } from "~/store/menu/state";
import { useGlobalStyles } from "~/styles";
import { Holder } from "~/utils/Holder";

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

	// Throwaway connection holders so the menu's networking hooks resolve.
	const gameHolder = useRef(new Holder<GameConnection>("GameConnection"));
	const lobbyHolder = useRef(new Holder<LobbyConnection>("LobbyConnection"));
	const accountHolder = useRef(new Holder<string>("AccountId"));

	return (
		<Provider store={store}>
			<SocketManagerProvider
				gameConnectionHolder={gameHolder.current}
				lobbyConnectionHolder={lobbyHolder.current}
				accountIdHolder={accountHolder.current}
			>
				{children}
			</SocketManagerProvider>
		</Provider>
	);
}
