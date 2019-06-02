import { Models } from "@common";
import { CARDS_UPDATED, REROLL_CARDS, BUY_CARD } from "./cardActionTypes";

export type BuyCardAction = ({ type: BUY_CARD, payload: { index: number }});

export type CardAction =
    ({ type: CARDS_UPDATED, payload: Models.Card[] })
    | ({ type: REROLL_CARDS })
    | BuyCardAction;

export const cardsUpdated = (payload: Models.Card[]) => ({
    type: CARDS_UPDATED,
    payload
});

export const rerollCards = () => ({
    type: REROLL_CARDS
});

export const buyCard = (index: number) => ({
    type: BUY_CARD,
    payload: {
        index
    }
});
