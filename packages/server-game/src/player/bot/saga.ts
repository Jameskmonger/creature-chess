import delay from "delay";
import { all, call, takeLatest, put } from "redux-saga/effects";
import { GamePhase } from "@creature-chess/models";
import { PlayerEvents, GameEvents } from "@creature-chess/gamemode";
import { preparingPhase } from "./preparingPhase";
import { putBenchOnBoard } from "./putBenchOnBoard";

export const botLogicSaga = function*() {
	yield all([
		call(putBenchOnBoard),
		takeLatest<GameEvents.GamePhaseStartedEvent>(
			GameEvents.gamePhaseStartedEvent.toString(),
			function*({ payload: { phase } }) {
				// delay all events to prevent any timing issues
				// todo improve this.. expose some event that happens after all the "game logic" has happened
				yield delay(1000);

				if (phase === GamePhase.PREPARING) {
					yield call(preparingPhase);
				} else if (phase === GamePhase.PLAYING) {
					yield put(PlayerEvents.clientFinishMatchEvent());
				}
			}
		)
	]);
};
