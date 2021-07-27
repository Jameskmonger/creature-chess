import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "@creature-chess/models";

export type CardShopState = {
	cards: (Card | null)[];
	locked: boolean;
};

const initialState: CardShopState = {
	cards: [],
	locked: false
};

const {
	actions,
	reducer: cardShopReducer,
} = createSlice({
	name: "cards",
	initialState,
	reducers: {
		updateCardsCommand: (state, { payload: cards }: PayloadAction<(Card | null)[]>) => ({
			...state,
			cards
		}),
		updateShopLockCommand: (state, { payload: locked }: PayloadAction<boolean>) => ({
			...state,
			locked
		}),
	}
});

// this stops the compiler from trying to export a type from @reduxjs/toolkit
const updateCardsCommand: (payload: (Card | null)[]) => ({ type: string; payload: (Card | null)[] })
	= actions.updateCardsCommand;

const updateShopLockCommand: (payload: boolean) => ({ type: string; payload: boolean })
	= actions.updateShopLockCommand;

export { updateCardsCommand, updateShopLockCommand, cardShopReducer };
