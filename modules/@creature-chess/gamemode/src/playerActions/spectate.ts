import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { definePlayerAction } from "./registry";

const spectateSchema = z.object({
	playerId: z.string().nullable(),
});

export type SpectatePlayerAction = ReturnType<typeof spectatePlayerAction>;
export const spectatePlayerAction = createAction<
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
