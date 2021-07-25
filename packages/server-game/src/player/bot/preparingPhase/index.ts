import { select, put, call } from "redux-saga/effects";
import { getVariable } from "@shoki/engine";
import { PlayerActions, PlayerState, PlayerVariables } from "@creature-chess/gamemode";
import delay from "delay";
import { BOT_ACTION_TIME_MS } from "../constants";
import { getActions } from "../actions";
import { putBenchOnBoard } from "../putBenchOnBoard";

export const preparingPhase = function*() {
	const name = yield* getVariable<PlayerVariables, string>(v => v.name);

	yield delay(BOT_ACTION_TIME_MS);

	while (true) {
		const state: PlayerState = yield select();

		const actions = getActions(state);

		if (actions.length === 0) {
			break;
		}

		const [mostValuable] = actions;

		console.log(`- ${name} executing '${mostValuable.name}'`);

		yield put(mostValuable.action());

		yield delay(BOT_ACTION_TIME_MS);

		yield call(putBenchOnBoard);
	}

	console.log(`- ${name} finished actions`);

	yield put(PlayerActions.readyUpPlayerAction());
};
