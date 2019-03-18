import { PokemonCard } from "../models/cardDeck";
import { DeckAction } from "../actions/deckActions";

interface DeckState {
    deck: PokemonCard[];
}

const initialDeckState: DeckState = {
    deck: []
};

export function deckReducer(state: DeckState = initialDeckState, action: DeckAction) {
    switch (action.type) {
        default:
            return state.deck;
    }
}
