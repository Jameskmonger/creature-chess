import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { GameBoardState } from "~/components/game/board/state";
import { setupGameListeners } from "~/listeners/gameListeners";

import { gameReducer } from "./game/state";
import { ClientExtra, ClientStartListening } from "./listenerContext";
import { lobbyReducer } from "./lobby/state";
import { menuReducer } from "./menu/state";
import { AppState } from "./state";

export const createAppStore = (gameBoard: GameBoardState) => {
	const extra: ClientExtra = {
		slices: gameBoard,
	};

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
