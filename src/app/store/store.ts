import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";
import { PokemonCard, PlayerListPlayer, GamePhase } from "@common";
import { composeWithDevTools } from "redux-devtools-extension";
import { PokemonPiece } from "@common/pokemon-piece";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";

export interface GameState {
    phase: GamePhase;
    phaseTimer: number;
    localPlayerId: string;
    opponentId: string;
    loading: boolean;
    money: number;
    selectedPiece: PokemonPiece;
    bannerMessage: string;
}

export interface AppState {
    pieces: PokemonPiece[];
    benchPieces: PokemonPiece[];
    game: GameState;
    playerList: PlayerListPlayer[];
    cards: PokemonCard[];
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers<AppState>({
        ...reducers,
    }),
    compose(
        applyMiddleware(sagaMiddleware),
        composeWithDevTools<any, any>()
    )
);

sagaMiddleware.run(rootSaga);

export { store };
