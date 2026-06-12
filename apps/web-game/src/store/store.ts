import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { setupGameListeners } from "~/listeners/gameListeners";

import { createGameReducer } from "./game/state";
import { ClientExtra, ClientStartListening } from "./listenerContext";
import { lobbyReducer } from "./lobby/state";
import { menuReducer } from "./menu/state";
import { AppState } from "./state";

export const createAppStore = (extra: ClientExtra) => {
	const listenerMiddleware = createListenerMiddleware({ extra });

	const store = configureStore<AppState>({
		reducer: {
			lobby: lobbyReducer,
			game: createGameReducer(),
			menu: menuReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: false,
				serializableCheck: false,
			}).prepend(listenerMiddleware.middleware),
		devTools: {
			trace: true,
			traceLimit: 20,
		},
	});

	setupGameListeners(listenerMiddleware.startListening as ClientStartListening);

	return store;
};
