import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import { cardShopReducer } from "../entities/player/state/cardShop";
import {
	toggleShopLockPlayerAction,
	setupToggleShopLockListener,
} from "./toggleShopLock";

const createTestStore = () => {
	const listenerMiddleware = createListenerMiddleware();

	setupToggleShopLockListener(listenerMiddleware.startListening as any);

	return configureStore({
		reducer: {
			cardShop: cardShopReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ thunk: false, serializableCheck: false })
				.prepend(listenerMiddleware.middleware),
	});
};

describe("setupToggleShopLockListener", () => {
	test("should toggle lock state", async () => {
		const store = createTestStore();

		expect(store.getState().cardShop.locked).toBe(false);

		store.dispatch(toggleShopLockPlayerAction());

		// Allow listener to run
		await new Promise((r) => setTimeout(r, 10));

		expect(store.getState().cardShop.locked).toBe(true);

		store.dispatch(toggleShopLockPlayerAction());

		// Allow listener to run
		await new Promise((r) => setTimeout(r, 10));

		expect(store.getState().cardShop.locked).toBe(false);
	});
});
