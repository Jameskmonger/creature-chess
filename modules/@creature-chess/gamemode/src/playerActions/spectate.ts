import { z } from "zod";

import { networkedAction } from "../events/networkedAction";
import { definePlayerAction } from "./registry";

const spectateSchema = z.object({
	playerId: z.string().nullable(),
});

export type SpectatePlayerAction = ReturnType<typeof spectatePlayerAction>;
export const spectatePlayerAction = networkedAction<
	z.infer<typeof spectateSchema>,
	"spectatePlayerAction"
>("spectatePlayerAction");

export const spectateDef = definePlayerAction({
	type: spectatePlayerAction.type,
	schema: spectateSchema,
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
