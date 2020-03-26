import { Card } from "@common/models";
import { CARDS_UPDATED, REROLL_CARDS, BUY_CARD } from "./cardActionTypes";

export type UpdateCardsAction = ({ type: CARDS_UPDATED, payload: Card[] });
export type RerollCardsAction = ({ type: REROLL_CARDS });
export type BuyCardAction = ({ type: BUY_CARD, payload: { index: number }});

export type CardAction =
    UpdateCardsAction
    | RerollCardsAction
    | BuyCardAction;

export const cardsUpdated = (payload: Card[]): UpdateCardsAction => ({
    type: CARDS_UPDATED,
    payload
});

export const rerollCards = (): RerollCardsAction => ({ type: REROLL_CARDS });

export const buyCard = (index: number): BuyCardAction => ({
    type: BUY_CARD,
    payload: {
        index
    }
});
