import { GET_DECK_SUCCESS } from "../actiontypes/deckActiontypes";
import { PokemonCard } from "../../shared/cardDeck";

export type DeckAction = { type: GET_DECK_SUCCESS, payload: PokemonCard[] };

export const getDeckSuccess = (payload: PokemonCard[]) => ({
    type: GET_DECK_SUCCESS,
    payload
});
