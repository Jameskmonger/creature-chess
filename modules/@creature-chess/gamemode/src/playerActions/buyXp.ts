import { z } from "zod";

import { MAX_LEVEL } from "@creature-chess/models";

import { networkedAction } from "../events/networkedAction";
import { definePlayerAction } from "./registry";
import { resyncPlayer } from "./resync";

export type BuyXpPlayerAction = ReturnType<typeof buyXpPlayerAction>;
export const buyXpPlayerAction = networkedAction("buyXpPlayerAction");

export const buyXpDef = definePlayerAction({
	type: buyXpPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		const { logger, settings, id, name } = player;

		if (!player.alive) {
			logger.info("Player attempted to buy xp, but dead", {
				actor: { playerId: id, name },
			});
			return;
		}

		if (player.level === MAX_LEVEL) {
			logger.info("Player attempted to buy xp, but at max level", {
				actor: { playerId: id, name },
			});
			return;
		}

		if (player.money < settings.buyXpCost) {
			logger.info("Not enough money to buy xp", {
				actor: { playerId: id, name },
				details: { money: player.money, cost: settings.buyXpCost },
			});
			resyncPlayer(player, "money");
			return;
		}

		player.addXp(settings.buyXpAmount);
		player.reduceMoney(settings.buyXpCost);
	},
});
