import { call, put } from "@redux-saga/core/effects";
import { PlayerGameActions } from "@creature-chess/gamemode";
import delay from "delay";
import { BOT_ACTION_TIME_MS } from "../constants";
import { buyBestPieces } from "../shop/buyBestPieces";
import { putBenchOnBoard } from "./putBenchOnBoard";
import { spendExcessMoneyOnXp } from "./spendExcessMoneyOnXp";

export const preparingPhase = function*() {
	yield call(buyBestPieces);
	yield call(spendExcessMoneyOnXp);
	yield call(putBenchOnBoard);

	yield delay(BOT_ACTION_TIME_MS);

	yield put(PlayerGameActions.readyUpPlayerAction());
};
