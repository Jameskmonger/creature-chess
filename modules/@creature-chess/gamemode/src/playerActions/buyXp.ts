import { createAction } from "@reduxjs/toolkit";

import { MAX_LEVEL } from "@creature-chess/models";

import { addXpCommand } from "../entities/player/listeners/xp";
import { PlayerStartListening } from "../entities/player/player";
import { playerInfoCommands } from "../entities/player/state/commands";
import { isPlayerAlive } from "../entities/player/state/selectors";

export type BuyXpPlayerAction = ReturnType<typeof buyXpPlayerAction>;
export const buyXpPlayerAction = createAction("buyXpPlayerAction");

export const setupBuyXpListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: buyXpPlayerAction,
		effect: async (_action, api) => {
			const playerId = api.player.id;
			const name = api.player.name;
			const { logger, settings } = api.player;

			if (!isPlayerAlive(api.getState())) {
				logger.info("Player attempted to buy xp, but dead", {
					actor: { playerId, name },
				});
				return;
			}

			const currentLevel = api.getState().playerInfo.level;

			if (currentLevel === MAX_LEVEL) {
				logger.info("Player attempted to buy xp, but at max level", {
					actor: { playerId, name },
				});
				return;
			}

			const money = api.getState().playerInfo.money;

			if (money < settings.buyXpCost) {
				logger.info("Not enough money to buy xp", {
					actor: { playerId, name },
					details: {
						money,
						cost: settings.buyXpCost,
					},
				});
				api.dispatch(playerInfoCommands.updateMoneyCommand(money));
				return;
			}

			api.dispatch(addXpCommand(settings.buyXpAmount));
			api.dispatch(
				playerInfoCommands.updateMoneyCommand(money - settings.buyXpCost)
			);
		},
	});
};
