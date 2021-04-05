import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { boardReducer, BoardState } from "../../board";
import { DefinitionProvider } from "../definitions/definitionProvider";
import { benchReducer, BenchState } from "./bench";
import { PlayerInfoState, playerInfoReducer } from "./playerInfo";

import {
    fillBoardSagaFactory, healthSagaFactory, xpSagaFactory, evolutionSagaFactory,
    PlayerActionSagas
} from "./sagas";
import { gameReducer, GameState } from "../store";
import { Logger } from "winston";

export interface PlayerState {
    board: BoardState;
    bench: BenchState;
    playerInfo: PlayerInfoState;
    game: GameState;
}

export type PlayerStore = Store<PlayerState>;

export const createPlayerStore = (logger: Logger, playerId: string): { store: PlayerStore, sagaMiddleware: SagaMiddleware } => {
    const rootSaga = function*() {
        yield all([
            yield fork(PlayerActionSagas.buyCardPlayerActionSagaFactory<PlayerState>(logger, new DefinitionProvider(), playerId)),
            yield fork(PlayerActionSagas.buyXpPlayerActionSagaFactory<PlayerState>(logger)),
            yield fork(PlayerActionSagas.dropPiecePlayerActionSagaFactory<PlayerState>(playerId)),
            yield fork(PlayerActionSagas.rerollCardsPlayerActionSagaFactory<PlayerState>()),
            yield fork(PlayerActionSagas.toggleShopLockPlayerActionSagaFactory<PlayerState>()),
            yield fork(PlayerActionSagas.sellPiecePlayerActionSagaFactory<PlayerState>()),
            yield fork(evolutionSagaFactory<PlayerState>()),
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
            game: gameReducer
        }),
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return {
        store,
        sagaMiddleware
    };
};
