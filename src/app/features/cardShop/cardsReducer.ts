import { Models } from "@common";
import { CardAction } from "./cardActions";
import { CARDS_UPDATED } from "./cardActionTypes";

export function cards(state: Models.Card[] = [], action: CardAction) {
    switch (action.type) {
        case CARDS_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
