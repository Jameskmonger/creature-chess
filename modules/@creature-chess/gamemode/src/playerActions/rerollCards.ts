import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { afterRerollCardsEvent } from "../entities/player/events";
import { playerInfoCommands } from "../entities/player/state/commands";
import { isPlayerAlive } from "../entities/player/state/selectors";
import { definePlayerAction } from "./registry";

export type RerollCardsPlayerAction = ReturnType<
	typeof rerollCardsPlayerAction
>;
export const rerollCardsPlayerAction = createAction("rerollCardsPlayerAction");

export const rerollCardsDef = definePlayerAction({
	type: rerollCardsPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		const { logger, settings } = player;
		const state = player.select((s) => s);

		if (!isPlayerAlive(state)) {
			logger.info("Attempted to reroll, but dead");
			return;
		}

		const money = state.playerInfo.money;

		if (money < settings.rerollCost) {
			logger.info(
				`Attempted to reroll costing $${settings.rerollCost} but only had $${money}`
			);
			return;
		}

		player.put(playerInfoCommands.updateMoneyCommand(money - settings.rerollCost));
		player.put(afterRerollCardsEvent());
	},
});
