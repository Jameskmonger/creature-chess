import { select, delay, put } from "@redux-saga/core/effects";
import { PlayerGameActions, PlayerState } from "@creature-chess/gamemode";
import { BOT_ACTION_TIME_MS } from "../constants";
import { shouldBuyXp } from "../shop/shouldBuyXp";

export const spendExcessMoneyOnXp = function*() {
	while (true) {
		const { playerInfo: { money, level, xp } }: PlayerState = yield select();

		if (shouldBuyXp(money, level, xp) === false) {
			return;
		}

		yield put(PlayerGameActions.buyXpPlayerAction());
		yield delay(BOT_ACTION_TIME_MS);
	}
};
