import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { boardReducer, BoardState } from "../board";
import { evolutionSagaFactory } from "./sagas/evolution";

import { dropPieceSagaFactory } from "./sagas/dropPiece";
import { benchReducer, BenchState } from "./bench";
import { cardShopSagaFactory } from "./sagas/cardShop";
import { PlayerInfoState, playerInfoReducer } from "./playerInfo";
import { DefinitionProvider } from "../game/definitionProvider";
import { healthSagaFactory } from "./sagas/health";
import { xpSagaFactory } from "./sagas/xp";
import { fillBoardSagaFactory } from "./sagas/fillBoard";

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
