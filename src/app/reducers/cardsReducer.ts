import { Models } from "@common";
import { CardAction } from "../actions/cardActions";
import { CARDS_UPDATED } from "../actiontypes/cardActionTypes";

export function cards(state: Models.Card[] = [], action: CardAction) {
    switch (action.type) {
        case CARDS_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
