import { call, getContext } from "@redux-saga/core/effects";
import { Logger } from "winston";
import { GameSagaContextPlayers } from "../sagas";
import { runPlayingPhase, runPreparingPhase, runReadyPhase } from "./phases";

export const gameLoopSaga = function*() {
	const players: GameSagaContextPlayers = yield getContext("players");
	const logger: Logger = yield getContext("logger");

	while (true) {
		yield call(runPreparingPhase);

		yield call(runReadyPhase);

		yield call(runPlayingPhase);

		if (players.getLiving().length < 2) {
			break;
		}
	}

	const winner = players.getLiving()[0];

	logger.info(`Game finished, won by ${winner.name}`);

	return {
		winnerId: winner.id
	};
};
