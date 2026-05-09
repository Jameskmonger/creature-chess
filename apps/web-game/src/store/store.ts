import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { setupGameListeners } from "~/listeners/gameListeners";

import { gameReducer } from "./game/state";
import { ClientExtra, ClientStartListening } from "./listenerContext";
import { lobbyReducer } from "./lobby/state";
import { menuReducer } from "./menu/state";
import { AppState } from "./state";

export const createAppStore = (sessionHolder: GameSessionHolder) => {
	const extra: ClientExtra = { sessionHolder };

	const listenerMiddleware = createListenerMiddleware({ extra });

	const store = configureStore<AppState>({
		reducer: {
			lobby: lobbyReducer,
			game: gameReducer,
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
