import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { gameInfoReducer, GameInfoState } from "../gameInfo";

export type GameState = {
    gameInfo: GameInfoState
};

export const createGameStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store: Store<GameState> = createStore(
        combineReducers<GameState>({
            gameInfo: gameInfoReducer,
        }),
        applyMiddleware(sagaMiddleware)
    );

    return { store, sagaMiddleware };
};
