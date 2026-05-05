import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { MAX_LEVEL } from "@creature-chess/models";

import { addXp } from "../entities/player/operations/xp";
import { playerInfoCommands } from "../entities/player/state/commands";
import { isPlayerAlive } from "../entities/player/state/selectors";
import { definePlayerAction } from "./registry";

export type BuyXpPlayerAction = ReturnType<typeof buyXpPlayerAction>;
export const buyXpPlayerAction = createAction("buyXpPlayerAction");

export const buyXpDef = definePlayerAction({
	type: buyXpPlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		const { logger, settings, id, name } = player;
		const state = player.select((s) => s);

		if (!isPlayerAlive(state)) {
			logger.info("Player attempted to buy xp, but dead", {
				actor: { playerId: id, name },
			});
			return;
		}

		if (state.playerInfo.level === MAX_LEVEL) {
			logger.info("Player attempted to buy xp, but at max level", {
				actor: { playerId: id, name },
			});
			return;
		}

		const money = state.playerInfo.money;

		if (money < settings.buyXpCost) {
			logger.info("Not enough money to buy xp", {
				actor: { playerId: id, name },
				details: { money, cost: settings.buyXpCost },
			});
			player.put(playerInfoCommands.updateMoneyCommand(money));
			return;
		}

		addXp(player, settings.buyXpAmount);
		player.put(
			playerInfoCommands.updateMoneyCommand(money - settings.buyXpCost)
		);
	},
});
