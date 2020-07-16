import { CardAction } from "./cardActions";
import { CARDS_UPDATED } from "./cardActionTypes";
import { Card } from "@common/models";

export function cards(state: Card[] = [], action: CardAction) {
    switch (action.type) {
        case CARDS_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
