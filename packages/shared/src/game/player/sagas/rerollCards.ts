import { takeEvery, select, put } from "@redux-saga/core/effects";
import { RerollCardsAction, REROLL_CARDS_ACTION } from "../actions";
import { updateMoneyCommand } from "../playerInfo/commands";
import { afterRerollCards } from "../actions";
import { isPlayerAlive } from "../playerSelectors";
import { REROLL_COST } from "@creature-chess/models";
import { PlayerState } from "../store";

export const rerollCards = function*() {
  yield takeEvery<RerollCardsAction>(
    REROLL_CARDS_ACTION,
    function*() {
      const isAlive: boolean = yield select(isPlayerAlive);

      if (isAlive === false) {
        console.log("Attempted to reroll, but dead");
        return;
      }

      const money: number = yield select((state: PlayerState) => state.playerInfo.money);

      // not enough money
      if (money < REROLL_COST) {
        console.log(`Attempted to reroll costing $${REROLL_COST} but only had $${money}`);
        return;
      }

      yield put(updateMoneyCommand(money - REROLL_COST));
      yield put(afterRerollCards());
    }
  );
};
