import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { boardReducer, BoardState } from "../board";
import { evolutionSagaFactory } from "./sagas/evolution";

import { dropPieceSagaFactory } from "./sagas/dropPiece";
import { benchReducer, BenchState } from "./bench";
import { cardShopSagaFactory } from "./cardShop/saga";
import { Card } from "@creature-chess/models";
import { cardsReducer } from "./cardShop";
import { GameInfoState, gameInfoReducer } from "./gameInfo";
import { levelReducer } from "./level";
import { DefinitionProvider } from "../game/definitionProvider";

export interface PlayerState {
    board: BoardState;
    bench: BenchState;
    gameInfo: GameInfoState;
    level: {
        level: number;
        xp: number;
    };
    cards: Card[];
}

export type PlayerStore = Store<PlayerState>;

export const createPlayerStore = (playerId: string, otherSaga?: () => Generator): { store: PlayerStore, sagaMiddleware: SagaMiddleware } => {
    const rootSaga = function*() {
        if (otherSaga) {
            yield fork(otherSaga);
        }

        yield all([
            yield fork(evolutionSagaFactory<PlayerState>()),
            yield fork(cardShopSagaFactory<PlayerState>(new DefinitionProvider(), playerId)),
            yield fork(dropPieceSagaFactory<PlayerState>(playerId))
        ]);
    };

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers<PlayerState>({
            board: boardReducer,
            bench: benchReducer,
            cards: cardsReducer,
            gameInfo: gameInfoReducer,
            level: levelReducer
        }),
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return {
        store,
        sagaMiddleware
    };
};
