import { PokemonCard } from "@common";
import { CARDS_UPDATED } from "../actiontypes/cardActionTypes";

export type CardAction = ({ type: CARDS_UPDATED, payload: PokemonCard[] });

export const cardsUpdated = (payload: PokemonCard[]) => ({
    type: CARDS_UPDATED,
    payload
});
