import { getContext, takeLatest } from "@redux-saga/core/effects";
import { put } from "redux-saga/effects";
import { PlayerSelectors } from "../player";
import { gamePhaseStartedEvent } from "./events";
import { RoundInfoCommands, SetRoundInfoCommand } from "./roundInfo";
import { GameSagaContextPlayers } from "./sagas";

export const sendPublicEventsSaga = function*() {
	yield takeLatest<SetRoundInfoCommand>(RoundInfoCommands.setRoundInfoCommand.toString(), function*({ payload }) {
		const { getAll }: GameSagaContextPlayers = yield getContext("players");

		getAll().filter(p => p.select(PlayerSelectors.isNotQuit)).forEach(player => {
			player.runSaga(function*() {
				yield put(gamePhaseStartedEvent(payload));
			});
		});
	});
};
