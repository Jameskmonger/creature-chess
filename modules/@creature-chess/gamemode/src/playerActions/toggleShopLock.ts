import { toggleShopLockPlayerAction } from "./creators";
import { definePlayerAction } from "./registry";

export const toggleShopLockDef = definePlayerAction({
	creator: toggleShopLockPlayerAction,
	handler: (player) => {
		player.setShopLocked(!player.shopLocked);
	},
});
