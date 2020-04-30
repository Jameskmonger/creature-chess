import { Card } from "@common/models";
import { CARDS_UPDATED } from "./cardActionTypes";

export type UpdateCardsAction = ({ type: CARDS_UPDATED, payload: Card[] });

export type CardAction =
    UpdateCardsAction;

export const cardsUpdated = (payload: Card[]): UpdateCardsAction => ({
    type: CARDS_UPDATED,
    payload
});

