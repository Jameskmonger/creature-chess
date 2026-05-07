import { z } from "zod";

import { networkedAction } from "../events/networkedAction";
import { definePlayerAction } from "./registry";

export type RerollCardsPlayerAction = ReturnType<
	typeof rerollCardsPlayerAction
>;
export const rerollCardsPlayerAction = networkedAction("rerollCardsPlayerAction");

export const rerollCardsDef = definePlayerAction({
	type: rerollCardsPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		const { logger, settings } = player;

		if (!player.alive) {
			logger.info("Attempted to reroll, but dead");
			return;
		}

		if (player.money < settings.rerollCost) {
			logger.info(
				`Attempted to reroll costing $${settings.rerollCost} but only had $${player.money}`
			);
			return;
		}

		player.reduceMoney(settings.rerollCost);
		player.emitRerollCards();
	},
});
