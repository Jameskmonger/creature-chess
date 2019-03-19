import { PokemonCard } from "@common/cardDeck";
import { DeckAction } from "../actions/deckActions";

export function deck(state: PokemonCard[] = [], action: DeckAction) {
    switch (action.type) {
        default:
            return state;
    }
}
