import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "@creature-chess/models";

export type CardShopState = {
    cards: Card[],
    locked: boolean
};

const initialState: CardShopState = {
    cards: [],
    locked: false
};

export const {
    actions: { updateCardsCommand, updateShopLockCommand },
    reducer: cardShopReducer,
} = createSlice({
    name: "cards",
    initialState,
    reducers: {
        updateCardsCommand: (state, { payload: cards }: PayloadAction<Card[]>) => ({
            ...state,
            cards
        }),
        updateShopLockCommand: (state, { payload: locked }: PayloadAction<boolean>) => ({
            ...state,
            locked
        }),
    }
});