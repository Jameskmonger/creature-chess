import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, CreatureType, DefinitionClass } from "@creature-chess/models";

export type CardShopState = {
	cards: (Card | null)[];
	locked: boolean;
};

type ReplaceCards = {
	oldCard: Card;
	newCard: Card;
};

const initialState: CardShopState = {
	cards: [{
		id: "0005",
		definitionId: 37,
		name: "Arbelder",
		type: CreatureType.Wood,
		class: DefinitionClass.VALIANT,
		cost: 5
	}, {
		id: "0001",
		definitionId: 10,
		name: "Chenipode",
		type: CreatureType.Earth,
		class: DefinitionClass.CUNNING,
		cost: 2
	}, {
		id: "0002",
		definitionId: 24,
		name: "Ruption",
		type: CreatureType.Fire,
		class: DefinitionClass.ARCANE,
		cost: 3
	}, {
		id: "0003",
		definitionId: 32,
		name: "Cairfrey",
		type: CreatureType.Metal,
		class: DefinitionClass.ARCANE,
		cost: 3
	}, {
		id: "0004",
		definitionId: 46,
		name: "Eaglace",
		type: CreatureType.Water,
		class: DefinitionClass.CUNNING,
		cost: 5
	}]
	,
	locked: false
};

const {
	actions,
	reducer: cardShopReducer,
} = createSlice({
	name: "cards",
	initialState,
	reducers: {
		replaceCardCommand: (state, { payload: { oldCard, newCard } }: PayloadAction<ReplaceCards>) => {
			state.cards.push(newCard);
		},
		removeCardCommand: (state, { payload: id }: PayloadAction<string>) => {
			state.cards.pop();
		},
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
const replaceCardCommand: (payload: ReplaceCards) => ({ type: string; payload: ReplaceCards })
	= actions.replaceCardCommand;
const removeCardCommand: (payload: string) => ({ type: string; payload: string })
	= actions.removeCardCommand;
const updateShopLockCommand: (payload: boolean) => ({ type: string; payload: boolean })
	= actions.updateShopLockCommand;

export { updateCardsCommand, updateShopLockCommand, removeCardCommand, replaceCardCommand, cardShopReducer };
