import { createReducer } from "@reduxjs/toolkit";

import {
	type CardShopState,
	type SpectatingState,
	initialCardShopState,
	initialSpectatingState,
	PlayerCommands,
} from "@creature-chess/gamemode";

export const cardShopReducer = createReducer<CardShopState>(
	initialCardShopState,
	(builder) => {
		builder
			.addCase(PlayerCommands.updateCardsCommand, (state, action) => {
				state.cards = action.payload;
			})
			.addCase(PlayerCommands.updateShopLockCommand, (state, action) => {
				state.locked = action.payload;
			});
	}
);

export const spectatingReducer = createReducer<SpectatingState>(
	initialSpectatingState,
	(builder) => {
		builder.addCase(
			PlayerCommands.setSpectatingIdCommand,
			(state, action) => {
				state.id = action.payload;
			}
		);
	}
);

export const playerReducers = {
	cardShop: cardShopReducer,
	spectating: spectatingReducer,
};
