import { PokemonCard } from "@common";
import { CARDS_UPDATED, REROLL_CARDS, BUY_CARD } from "../actiontypes/cardActionTypes";

export type BuyCardAction = ({ type: BUY_CARD, payload: { index: number }});

export type CardAction =
    ({ type: CARDS_UPDATED, payload: PokemonCard[] })
    | ({ type: REROLL_CARDS })
    | BuyCardAction;

export const cardsUpdated = (payload: PokemonCard[]) => ({
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
