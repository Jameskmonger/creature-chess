import { createAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { getPlayerEntityDependencies } from "../entities/player/dependencies";
import { afterRerollCardsEvent } from "../entities/player/events";
import { playerInfoCommands } from "../entities/player/state/commands";
import { isPlayerAlive } from "../entities/player/state/selectors";

export type RerollCardsPlayerAction = ReturnType<
	typeof rerollCardsPlayerAction
>;
export const rerollCardsPlayerAction = createAction("rerollCardsPlayerAction");

export const rerollCardsPlayerActionSaga = function* () {
	yield takeEvery<RerollCardsPlayerAction>(
		rerollCardsPlayerAction.toString(),
		function* () {
			const { logger, settings } = yield* getPlayerEntityDependencies();

			const isAlive = yield* select(isPlayerAlive);

			if (isAlive === false) {
				logger.info("Attempted to reroll, but dead");
				return;
			}

			const money: number = yield select((state) => state.playerInfo.money);

			// not enough money
			if (money < settings.rerollCost) {
				logger.info(
					`Attempted to reroll costing $${settings.rerollCost} but only had $${money}`
				);
				return;
			}

			yield put(
				playerInfoCommands.updateMoneyCommand(money - settings.rerollCost)
			);
			yield put(afterRerollCardsEvent());
		}
	);
};
