import { spectatePlayerAction } from "./creators";
import { definePlayerAction } from "./registry";

export const spectateDef = definePlayerAction({
	creator: spectatePlayerAction,
	handler: (player, { playerId }) => {
		if (playerId === null) {
			player.setSpectatingId(null);
			return;
		}

		const other = player.gamemode.getPlayerById(playerId);
		if (!other || !other.alive) {
			return;
		}

		player.setSpectatingId(playerId);
	},
});
