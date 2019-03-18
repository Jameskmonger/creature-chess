import { GET_DECK_SUCCESS } from "../actiontypes/deckActiontypes";
import { PokemonCard } from "../models/cardDeck";

export type DeckAction = { type: GET_DECK_SUCCESS, payload: PokemonCard[] };

export const getDeckSuccess = (payload: PokemonCard[]) => ({
    payload,
    type: GET_DECK_SUCCESS
});
