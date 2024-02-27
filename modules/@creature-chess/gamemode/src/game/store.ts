import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { RoundInfoState } from "@creature-chess/models";

import { roundInfoReducer } from "./roundInfo";
import { GameSagaContext } from "./sagas";

export type GameState = {
	roundInfo: RoundInfoState;
};

export const createGameStore = (context: GameSagaContext) => {
	const sagaMiddleware = createSagaMiddleware({
		context,
	});

	const store = configureStore<GameState>({
		reducer: {
			roundInfo: roundInfoReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: false,
				serializableCheck: false,
			}).concat(sagaMiddleware),
	});

	return { store, sagaMiddleware };
};
