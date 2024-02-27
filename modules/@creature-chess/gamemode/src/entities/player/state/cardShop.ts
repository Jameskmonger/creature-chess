import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Card } from "@creature-chess/models";

export type CardShopState = {
	cards: (Card | null)[];
	locked: boolean;
};

const initialState: CardShopState = {
	cards: [],
	locked: false,
};

const { actions, reducer: cardShopReducer } = createSlice({
	name: "cards",
	initialState,
	reducers: {
		updateCardsCommand: (
			state,
			{ payload: cards }: PayloadAction<(Card | null)[]>
		) => ({
			...state,
			cards,
		}),
		updateShopLockCommand: (
			state,
			{ payload: locked }: PayloadAction<boolean>
		) => ({
			...state,
			locked,
		}),
	},
});

export const updateCardsCommand = actions.updateCardsCommand;
export const updateShopLockCommand = actions.updateShopLockCommand;

export { cardShopReducer };
