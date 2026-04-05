import { createAction } from "@reduxjs/toolkit";

import { PlayerStartListening } from "../entities/player/dependencies";
import { updateShopLockCommand } from "../entities/player/state/cardShop";
import { isPlayerShopLocked } from "../entities/player/state/selectors";

export type ToggleShopLockPlayerAction = ReturnType<
	typeof toggleShopLockPlayerAction
>;
export const toggleShopLockPlayerAction = createAction(
	"toggleShopLockPlayerAction"
);

export const setupToggleShopLockListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: toggleShopLockPlayerAction,
		effect: async (_action, api) => {
			const currentLockState = isPlayerShopLocked(api.getState());
			api.dispatch(updateShopLockCommand(!currentLockState));
		},
	});
};
