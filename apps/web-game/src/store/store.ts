import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { networkingSaga } from "~/networking";



import { gameReducer } from "./game/state";
import { lobbyReducer } from "./lobby/state";
import { menuReducer } from "./menu/state";
import { SagaContext } from "./sagaContext";
import { AppState } from "./state";
import { GameBoardState } from "~/components/game/board/state";

export const createAppStore = (gameBoard: GameBoardState) => {
	const sagaMiddleware = createSagaMiddleware<SagaContext>({
		context: {
			slices: gameBoard,
		},
	});

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
			}).concat(sagaMiddleware),
		devTools: {
			trace: true,
			traceLimit: 20,
		},
	});

	sagaMiddleware.run(networkingSaga, gameBoard);

	return store;
};
