import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";
import { PokemonCard, PlayerListPlayer } from "@common";
import { composeWithDevTools } from "redux-devtools-extension";
import { PokemonPiece } from "@common/pokemon-piece";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";

export interface LobbyState {
    inLobby: boolean;
}

export interface AppState {
    deck: PokemonCard[];
    pieces: PokemonPiece[];
    lobby: LobbyState;
    playerList: PlayerListPlayer[];
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
