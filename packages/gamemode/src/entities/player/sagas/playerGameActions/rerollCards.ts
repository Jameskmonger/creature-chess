import { put, takeEvery } from "redux-saga/effects";
import { select } from "typed-redux-saga";
import { REROLL_COST } from "@creature-chess/models";
import { isPlayerAlive } from "../../../../player/playerSelectors";
import { updateMoneyCommand } from "../../../../player/playerInfo/commands";
import { createAction } from "@reduxjs/toolkit";
import { afterRerollCardsEvent } from "../../../../player/events";
import { getPlayerSagaDependencies } from "../../../../player/sagaContext";

export type RerollCardsPlayerAction = ReturnType<typeof rerollCardsPlayerAction>;
export const rerollCardsPlayerAction = createAction("rerollCardsPlayerAction");

export const rerollCardsPlayerActionSaga = function*() {
	yield takeEvery<RerollCardsPlayerAction>(
		rerollCardsPlayerAction.toString(),
		function*() {
			const { logger } = yield* getPlayerSagaDependencies();

			const isAlive = yield* select(isPlayerAlive);

			if (isAlive === false) {
				logger.info("Attempted to reroll, but dead");
				return;
			}

			const money: number = yield select(state => state.playerInfo.money);

			// not enough money
			if (money < REROLL_COST) {
				logger.info(`Attempted to reroll costing $${REROLL_COST} but only had $${money}`);
				return;
			}

			yield put(updateMoneyCommand(money - REROLL_COST));
			yield put(afterRerollCardsEvent());
		}
	);
};