import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

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
		player.setShopLocked(!player.shopLocked);
	},
});
