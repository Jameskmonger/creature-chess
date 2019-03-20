import { createStore, combineReducers } from "redux";
import { reducers } from "../reducers";
import { PokemonCard } from "@common/cardDeck";
import { composeWithDevTools } from "redux-devtools-extension";

interface AppState {
    deck: PokemonCard[];
}

export const store = createStore<AppState, any, void, void>(
    combineReducers<AppState>({
        ...reducers,
    }),
    composeWithDevTools<any, any>()
);
