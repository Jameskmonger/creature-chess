import { createStore, combineReducers } from "redux";
import { PokemonCard } from "../models/cardDeck";
import { reducers } from "../reducers";

interface AppState {
    deckReducer: PokemonCard[];
}

export const store = createStore<AppState, any, void, void>(
    combineReducers<AppState>({
        ...reducers
    })
);
