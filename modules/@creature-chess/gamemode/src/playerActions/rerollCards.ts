import { rerollCardsPlayerAction } from "./creators";
import { definePlayerAction } from "./registry";

export const rerollCardsDef = definePlayerAction({
	creator: rerollCardsPlayerAction,
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
