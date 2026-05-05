import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { updateShopLockCommand } from "../entities/player/state/cardShop";
import { isPlayerShopLocked } from "../entities/player/state/selectors";
import { definePlayerAction } from "./registry";

export type ToggleShopLockPlayerAction = ReturnType<
	typeof toggleShopLockPlayerAction
>;
export const toggleShopLockPlayerAction = createAction(
	"toggleShopLockPlayerAction"
);

export const toggleShopLockDef = definePlayerAction({
	type: toggleShopLockPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		const currentLockState = isPlayerShopLocked(player.select((s) => s));
		player.put(updateShopLockCommand(!currentLockState));
	},
});
