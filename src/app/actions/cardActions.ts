import { Models } from "@common";
import { CARDS_UPDATED, REROLL_CARDS, PURCHASE_CARD } from "../actiontypes/cardActionTypes";

export type PurchaseCardAction = ({ type: PURCHASE_CARD, payload: { index: number }});

export type CardAction =
    ({ type: CARDS_UPDATED, payload: Models.Card[] })
    | ({ type: REROLL_CARDS })
    | PurchaseCardAction;

export const cardsUpdated = (payload: Models.Card[]) => ({
    type: CARDS_UPDATED,
    payload
});

export const rerollCards = () => ({
    type: REROLL_CARDS
});

export const purchaseCard = (index: number) => ({
    type: PURCHASE_CARD,
    payload: {
        index
    }
});
