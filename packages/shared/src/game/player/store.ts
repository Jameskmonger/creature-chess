import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { BoardState, BoardSlice } from "@creature-chess/board";
import { DefinitionProvider } from "../definitions/definitionProvider";
import { PlayerInfoState, playerInfoReducer } from "./playerInfo";

import {
    fillBoardSagaFactory, healthSagaFactory, xpSagaFactory, evolutionSagaFactory,
    PlayerActionSagas
} from "./sagas";
import { gameReducer, GameState } from "../store";
import { Logger } from "winston";
import { cardShopReducer, CardShopState } from "./cardShop";
import { PieceModel } from "@creature-chess/models";

export interface PlayerState {
    board: BoardState<PieceModel>;
    bench: BoardState<PieceModel>;
    cardShop: CardShopState;
    playerInfo: PlayerInfoState;
    game: GameState;
}

export type PlayerStore = Store<PlayerState>;

export const createPlayerStore = (
    getLogger: () => Logger,
    playerId: string,
    name: string,
    slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
): { store: PlayerStore, sagaMiddleware: SagaMiddleware } => {
    const rootSaga = function*() {
        yield all([
            yield fork(PlayerActionSagas.buyCardPlayerActionSagaFactory<PlayerState>(getLogger, new DefinitionProvider(), slices, playerId, name)),
            yield fork(PlayerActionSagas.buyXpPlayerActionSagaFactory<PlayerState>(getLogger, playerId, name)),
            yield fork(PlayerActionSagas.dropPiecePlayerActionSagaFactory<PlayerState>(slices, playerId)),
            yield fork(PlayerActionSagas.rerollCardsPlayerActionSagaFactory<PlayerState>()),
            yield fork(PlayerActionSagas.toggleShopLockPlayerActionSagaFactory<PlayerState>()),
            yield fork(PlayerActionSagas.sellPiecePlayerActionSagaFactory<PlayerState>(slices)),
            yield fork(evolutionSagaFactory<PlayerState>(slices)),
            yield fork(healthSagaFactory<PlayerState>()),
            yield fork(xpSagaFactory<PlayerState>(slices)),
            yield fork(fillBoardSagaFactory<PlayerState>(playerId))
        ]);
    };

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers<PlayerState>({
            board: slices.boardSlice.boardReducer,
            bench: slices.benchSlice.boardReducer,
            playerInfo: playerInfoReducer,
            game: gameReducer,
            cardShop: cardShopReducer
        }),
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return {
        store,
        sagaMiddleware
    };
};
