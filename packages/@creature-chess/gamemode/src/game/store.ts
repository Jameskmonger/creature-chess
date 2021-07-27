import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { roundInfoReducer } from "./roundInfo";
import { RoundInfoState } from "@creature-chess/models";
import { GameSagaContext } from "./sagas";

export type GameState = {
	roundInfo: RoundInfoState;
};

export const createGameStore = (context: GameSagaContext) => {
	const sagaMiddleware = createSagaMiddleware({
		context
	});

	const store: Store<GameState> = createStore(
		combineReducers<GameState>({
			roundInfo: roundInfoReducer,
		}),
		applyMiddleware(sagaMiddleware)
	);

	return { store, sagaMiddleware };
};
