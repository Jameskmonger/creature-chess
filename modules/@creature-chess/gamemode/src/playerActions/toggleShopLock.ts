import { z } from "zod";

import { networkedAction } from "../events/networkedAction";
import { definePlayerAction } from "./registry";

export type ToggleShopLockPlayerAction = ReturnType<
	typeof toggleShopLockPlayerAction
>;
export const toggleShopLockPlayerAction = networkedAction(
	"toggleShopLockPlayerAction"
);

export const toggleShopLockDef = definePlayerAction({
	type: toggleShopLockPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		player.setShopLocked(!player.shopLocked);
	},
});
