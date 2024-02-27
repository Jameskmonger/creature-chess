import { take, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { select, getContext } from "typed-redux-saga";

import { MAX_LEVEL } from "@creature-chess/models/config";

import { getPlayerEntityDependencies } from "../entities/player/dependencies";
import { addXpCommand } from "../entities/player/sagas/xp";
import { playerInfoCommands } from "../entities/player/state/commands";
import { isPlayerAlive } from "../entities/player/state/selectors";

export type BuyXpPlayerAction = ReturnType<typeof buyXpPlayerAction>;
export const buyXpPlayerAction = createAction("buyXpPlayerAction");

export const buyXpPlayerActionSaga = function* () {
	while (true) {
		const playerId = yield* getContext<string>("id");
		const name = yield* getContext<string>("playerName");
		const { logger, settings } = yield* getPlayerEntityDependencies();

		yield take(buyXpPlayerAction.toString());

		const isAlive = yield* select(isPlayerAlive);

		if (isAlive === false) {
			logger.info("Player attempted to buy xp, but dead", {
				actor: { playerId, name },
			});
			continue;
		}

		const currentLevel = yield* select((state) => state.playerInfo.level);

		if (currentLevel === MAX_LEVEL) {
			logger.info("Player attempted to buy xp, but at max level", {
				actor: { playerId, name },
			});
			continue;
		}

		const money = yield* select((state) => state.playerInfo.money);

		// not enough money
		if (money < settings.buyXpCost) {
			logger.info("Not enough money to buy xp", {
				actor: { playerId, name },
				details: {
					money,
					cost: settings.buyXpCost,
				},
			});

			yield put(playerInfoCommands.updateMoneyCommand(money));

			continue;
		}

		yield put(addXpCommand(settings.buyXpAmount));
		yield put(
			playerInfoCommands.updateMoneyCommand(money - settings.buyXpCost)
		);
	}
};
