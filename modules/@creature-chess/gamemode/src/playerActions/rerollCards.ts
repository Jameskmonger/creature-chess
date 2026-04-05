import { createAction } from "@reduxjs/toolkit";

import { PlayerStartListening } from "../entities/player/dependencies";
import { afterRerollCardsEvent } from "../entities/player/events";
import { playerInfoCommands } from "../entities/player/state/commands";
import { isPlayerAlive } from "../entities/player/state/selectors";

export type RerollCardsPlayerAction = ReturnType<
	typeof rerollCardsPlayerAction
>;
export const rerollCardsPlayerAction = createAction("rerollCardsPlayerAction");

export const setupRerollCardsListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: rerollCardsPlayerAction,
		effect: async (_action, api) => {
			const { logger, settings } = api.extra.dependencies;

			if (!isPlayerAlive(api.getState())) {
				logger.info("Attempted to reroll, but dead");
				return;
			}

			const money = api.getState().playerInfo.money;

			if (money < settings.rerollCost) {
				logger.info(
					`Attempted to reroll costing $${settings.rerollCost} but only had $${money}`
				);
				return;
			}

			api.dispatch(
				playerInfoCommands.updateMoneyCommand(money - settings.rerollCost)
			);
			api.dispatch(afterRerollCardsEvent());
		},
	});
};
