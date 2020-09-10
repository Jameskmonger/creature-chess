import { CardsUpdatedAction, CARDS_UPDATED } from "./actions";
import { Card } from "../../models";

export function cards(state: Card[] = [], action: CardsUpdatedAction): Card[] {
    switch (action.type) {
        case CARDS_UPDATED:
            return action.payload.cards;
        default:
            return state;
    }
}
