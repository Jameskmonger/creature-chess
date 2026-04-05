import { configureStore, createListenerMiddleware, Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";

import { RoundInfoState } from "@creature-chess/models";

import { roundInfoReducer } from "./roundInfo";
import { GameContext } from "./gameContext";

export type GameState = {
	roundInfo: RoundInfoState;
};

export type GameStartListening = TypedStartListening<GameState, Dispatch<UnknownAction>, GameContext>;

export const createGameStore = (context: GameContext) => {
	const listenerMiddleware = createListenerMiddleware({ extra: context });

	const store = configureStore<GameState>({
		reducer: {
			roundInfo: roundInfoReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: false,
				serializableCheck: false,
			}).prepend(listenerMiddleware.middleware),
	});

	return {
		store,
		startListening: listenerMiddleware.startListening as GameStartListening,
	};
};
