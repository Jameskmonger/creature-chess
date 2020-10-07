import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { boardReducer, BoardState } from "../../board";
import { DefinitionProvider } from "../definitions/definitionProvider";
import { benchReducer, BenchState } from "./bench";
import { PlayerInfoState, playerInfoReducer } from "./playerInfo";

import { fillBoardSagaFactory, cardShopSagaFactory, healthSagaFactory, xpSagaFactory, dropPieceSagaFactory, evolutionSagaFactory } from "./sagas";

export interface PlayerState {
    board: BoardState;
    bench: BenchState;
    playerInfo: PlayerInfoState;
}

export type PlayerStore = Store<PlayerState>;

export const createPlayerStore = (playerId: string): { store: PlayerStore, sagaMiddleware: SagaMiddleware } => {
    const rootSaga = function*() {
        yield all([
            yield fork(evolutionSagaFactory<PlayerState>()),
            yield fork(cardShopSagaFactory<PlayerState>(new DefinitionProvider(), playerId)),
            yield fork(dropPieceSagaFactory<PlayerState>(playerId)),
            yield fork(healthSagaFactory<PlayerState>()),
            yield fork(xpSagaFactory<PlayerState>()),
            yield fork(fillBoardSagaFactory<PlayerState>(playerId))
        ]);
    };

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers<PlayerState>({
            board: boardReducer,
            bench: benchReducer,
            playerInfo: playerInfoReducer,
        }),
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return {
        store,
        sagaMiddleware
    };
};
