import { Card } from "@creature-chess/models";

export const CARDS_UPDATED = "CARDS_UPDATED";
export type CARDS_UPDATED = typeof CARDS_UPDATED;

export type CardsUpdatedAction = ({ type: CARDS_UPDATED, payload: { cards: Card[] } });

export const cardsUpdated = (cards: Card[]): CardsUpdatedAction => ({
    type: CARDS_UPDATED,
    payload: {
        cards
    }
});
