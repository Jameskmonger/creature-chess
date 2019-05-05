import { PokemonCard } from "@common";
import { CARDS_UPDATED, REROLL_CARDS, PURCHASE_CARD } from "../actiontypes/cardActionTypes";

export type CardAction =
    ({ type: CARDS_UPDATED, payload: PokemonCard[] })
    | ({ type: REROLL_CARDS })
    | ({ type: PURCHASE_CARD, payload: { index: number }});

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
