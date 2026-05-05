import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { GamePhase } from "@creature-chess/models";

import { playerInfoCommands } from "../entities/player/state/commands";
import {
	isPlayerAlive,
	isPlayerReady,
} from "../entities/player/state/selectors";
import { definePlayerAction } from "./registry";

export type ReadyUpPlayerAction = ReturnType<typeof readyUpPlayerAction>;
export const readyUpPlayerAction = createAction("readyUpPlayerAction");

export const readyUpDef = definePlayerAction({
	type: readyUpPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		const { name, logger, gamemode } = player;
		const state = player.select((s) => s);

		if (!isPlayerAlive(state)) {
			logger.info("Attempted to ready up, but dead", { actor: { name } });
			return;
		}

		if (gamemode.getRoundInfo().phase !== GamePhase.PREPARING) {
			logger.info("Attempted to ready up, but not in preparing phase", {
				actor: { name },
			});
			return;
		}

		if (isPlayerReady(state)) {
			logger.info("Attempted to ready up, but already ready", {
				actor: { name },
			});
			return;
		}

		player.put(playerInfoCommands.updateReadyCommand(true));
	},
});
