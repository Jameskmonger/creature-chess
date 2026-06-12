import { PlayerStatus } from "@creature-chess/models";

import { quitGamePlayerAction } from "./creators";
import { definePlayerAction } from "./registry";

export const quitGameDef = definePlayerAction({
	creator: quitGamePlayerAction,
	handler: (player) => {
		player.setStatus(PlayerStatus.QUIT);
	},
});
