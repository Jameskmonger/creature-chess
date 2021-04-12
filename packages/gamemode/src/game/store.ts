import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { roundInfoReducer, RoundInfoState } from "./roundInfo";

export type GameState = {
    roundInfo: RoundInfoState
};

export const createGameStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store: Store<GameState> = createStore(
        combineReducers<GameState>({
            roundInfo: roundInfoReducer,
        }),
        applyMiddleware(sagaMiddleware)
    );

    return { store, sagaMiddleware };
};
