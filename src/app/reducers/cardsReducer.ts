import { PokemonCard } from "@common";
import { CardAction } from "../actions/cardActions";
import { CARDS_UPDATED } from "../actiontypes/cardActionTypes";

export function cards(state: PokemonCard[] = [], action: CardAction) {
    switch (action.type) {
        case CARDS_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
