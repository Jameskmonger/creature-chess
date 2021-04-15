import { Logger } from "winston";
import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { BoardState, BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import { PlayerInfoState, playerInfoReducer } from "./playerInfo";
import {
    fillBoardSagaFactory, healthSagaFactory, xpSagaFactory, evolutionSagaFactory
} from "./sagas";
import { roundInfoReducer, RoundInfoState } from "../game/roundInfo";
import { cardShopReducer, CardShopState } from "./cardShop";
import { PlayerSagaContext } from "./sagaContext";
import { playerGameActionsSaga } from "./playerGameActions";

export interface PlayerState {
    board: BoardState<PieceModel>;
    bench: BoardState<PieceModel>;
    cardShop: CardShopState;
    playerInfo: PlayerInfoState;
    roundInfo: RoundInfoState;
}

export type PlayerStore = Store<PlayerState>;

export const createPlayerStore = (
    getLogger: () => Logger,
    playerId: string,
    playerName: string,
    boardSlices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
): { store: PlayerStore, sagaMiddleware: SagaMiddleware } => {
    const rootSaga = function*() {
        yield all([
            yield fork(playerGameActionsSaga),
            yield fork(evolutionSagaFactory<PlayerState>(boardSlices)),
            yield fork(healthSagaFactory<PlayerState>()),
            yield fork(xpSagaFactory<PlayerState>(boardSlices)),
            yield fork(fillBoardSagaFactory<PlayerState>(playerId))
        ]);
    };

    const sagaMiddleware = createSagaMiddleware<PlayerSagaContext>({
        context: {
            playerId,
            playerName,
            boardSlices,
            dependencies: {
                getLogger
            }
        }
    });

    const store = createStore(
        combineReducers<PlayerState>({
            board: boardSlices.boardSlice.boardReducer,
            bench: boardSlices.benchSlice.boardReducer,
            playerInfo: playerInfoReducer,
            roundInfo: roundInfoReducer,
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
