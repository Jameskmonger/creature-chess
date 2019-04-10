import { createStore, combineReducers } from "redux";
import { reducers } from "../reducers";
import { PokemonCard, PlayerListPlayer } from "@common";
import { composeWithDevTools } from "redux-devtools-extension";
import { PokemonPiece } from "@common/pokemon-piece";

export interface LobbyState {
    inLobby: boolean;
}

export interface AppState {
    deck: PokemonCard[];
    pieces: PokemonPiece[];
    lobby: LobbyState;
    playerList: PlayerListPlayer[];
}

export const store = createStore<AppState, any, void, void>(
    combineReducers<AppState>({
        ...reducers,
    }),
    composeWithDevTools<any, any>()
);
