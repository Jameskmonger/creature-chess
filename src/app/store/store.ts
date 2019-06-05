import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducers } from "./reducers";
import { Models, GamePhase } from "@common";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import { FeedMessage } from "@common/feed-message";

export interface GameState {
    gameId: string;
    phase: GamePhase;
    phaseTimer: number;
    opponentId: string;
    loading: boolean;
    lobbyError: string;
    money: number;
    round: number | null;
    debug: boolean;
}

export interface LocalPlayerState {
    id: string;
    name: string;
    level: number;
    xp: number;
    ready: boolean;
}

export interface AppState {
    board: Models.Piece[];
    bench: Models.Piece[];
    game: GameState;
    playerList: Models.PlayerListPlayer[];
    cards: Models.Card[];
    localPlayer: LocalPlayerState;
    feedMessages: FeedMessage[];
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers<AppState>({
        ...reducers,
    }),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

export { store };
