import { call, getContext } from "@redux-saga/core/effects";
import { select, takeEvery } from "typed-redux-saga";
import { Logger } from "winston";

import { updateVariables } from "@shoki/engine";

import { PlayerVariables } from "../../entities/player";
import { playerDeathEvent } from "../../entities/player/events";
import { GameSagaContextPlayers } from "../sagas";
import { GameState } from "../store";
import { runPlayingPhase, runPreparingPhase, runReadyPhase } from "./phases";

export const gameLoopSaga = function* () {
	const players: GameSagaContextPlayers = yield getContext("players");
	const logger: Logger = yield getContext("logger");

	let currentLastPosition = players.getAll().length;
	let currentRound = 0;

	for (const player of players.getAll()) {
		player.runSaga(function* () {
			yield takeEvery(playerDeathEvent, function* () {
				yield updateVariables<PlayerVariables>({
					finishPosition: currentLastPosition,
					finishRound: currentRound,
				});

				currentLastPosition--;
			});
		});
	}

	while (true) {
		yield call(runPreparingPhase);

		currentRound = yield* select((state: GameState) => state.roundInfo.round);

		yield call(runReadyPhase);
		yield call(runPlayingPhase);

		if (players.getLiving().length < 2) {
			break;
		}
	}

	if (players.getLiving().length === 0) {
		console.log("Game finished, no winners");

		return players.getAll().map((p) => ({
			id: p.id,
			position: p.getVariable((v) => v.finishPosition),
			finishRound: p.getVariable((v) => v.finishRound),
		}));
	}

	yield call(function* () {
		yield players
			.getLiving()[0]
			.runSaga(function* () {
				yield updateVariables<PlayerVariables>({
					finishPosition: 1,
					finishRound: currentRound,
				});
			})
			.toPromise();
	});

	return players.getAll().map((p) => ({
		id: p.id,
		position: p.getVariable((v) => v.finishPosition),
		finishRound: p.getVariable((v) => v.finishRound),
	}));
};
