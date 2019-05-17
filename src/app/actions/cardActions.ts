import { PokemonCard } from "@common";
import { CARDS_UPDATED, REROLL_CARDS, PURCHASE_CARD } from "../actiontypes/cardActionTypes";

export type PurchaseCardAction = ({ type: PURCHASE_CARD, payload: { index: number }});

export type CardAction =
    ({ type: CARDS_UPDATED, payload: PokemonCard[] })
    | ({ type: REROLL_CARDS })
    | PurchaseCardAction;

export const cardsUpdated = (payload: PokemonCard[]) => ({
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
