import { select, put, takeEvery } from "@redux-saga/core/effects";
import { REROLL_COST } from "@creature-chess/models";
import { isPlayerAlive } from "../playerSelectors";
import { updateMoneyCommand } from "../playerInfo/commands";
import { createAction } from "@reduxjs/toolkit";
import { afterRerollCardsEvent } from "../events";

export type RerollCardsPlayerAction = ReturnType<typeof rerollCardsPlayerAction>;
export const rerollCardsPlayerAction = createAction("rerollCardsPlayerAction");

export const rerollCardsPlayerActionSaga = function*() {
    yield takeEvery<RerollCardsPlayerAction>(
        rerollCardsPlayerAction.toString(),
        function*() {
            const isAlive: boolean = yield select(isPlayerAlive);

            if (isAlive === false) {
                console.log("Attempted to reroll, but dead");
                return;
            }

            const money: number = yield select(state => state.playerInfo.money);

            // not enough money
            if (money < REROLL_COST) {
                console.log(`Attempted to reroll costing $${REROLL_COST} but only had $${money}`);
                return;
            }

            yield put(updateMoneyCommand(money - REROLL_COST));
            yield put(afterRerollCardsEvent());
        }
    );
};