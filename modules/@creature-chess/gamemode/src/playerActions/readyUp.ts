import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { GamePhase } from "@creature-chess/models";

import { definePlayerAction } from "./registry";

export type ReadyUpPlayerAction = ReturnType<typeof readyUpPlayerAction>;
export const readyUpPlayerAction = createAction("readyUpPlayerAction");

export const readyUpDef = definePlayerAction({
	type: readyUpPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		const { name, logger, gamemode } = player;

		if (!player.alive) {
			logger.info("Attempted to ready up, but dead", { actor: { name } });
			return;
		}

		if (gamemode.getRoundInfo().phase !== GamePhase.PREPARING) {
			logger.info("Attempted to ready up, but not in preparing phase", {
				actor: { name },
			});
			return;
		}

		if (player.ready) {
			logger.info("Attempted to ready up, but already ready", {
				actor: { name },
			});
			return;
		}

		player.setReady(true);
	},
});
