import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";
import { PokemonCard, PlayerListPlayer, GamePhase } from "@common";
import { composeWithDevTools } from "redux-devtools-extension";
import { PokemonPiece } from "@common/pokemon-piece";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";
import { FeedMessage } from "@common/feed-message";

export interface GameState {
    phase: GamePhase;
    phaseTimer: number;
    opponentId: string;
    loading: boolean;
    money: number;
    selectedPiece: PokemonPiece;
}

export interface LocalPlayerState {
    id: string;
    name: string;
    level: number;
    xp: number;
}

export interface AppState {
    pieces: PokemonPiece[];
    benchPieces: PokemonPiece[];
    game: GameState;
    playerList: PlayerListPlayer[];
    cards: PokemonCard[];
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
