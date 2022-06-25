import { put, delay, getContext } from "redux-saga/effects";
import { Logger } from "winston";

import { GameOptions, GamePhase } from "@creature-chess/models";

import {
	playerBeforeReadyPhaseEvent,
	playerRunReadyPhaseEvent,
} from "../../events";
import { Match } from "../../match";
import { RoundInfoCommands } from "../../roundInfo";
import { GameSagaContextPlayers, GetMatchupsFn } from "../../sagas";

export const runReadyPhase = function* () {
	const options: GameOptions = yield getContext("options");
	const players: GameSagaContextPlayers = yield getContext("players");
	const getMatchups: GetMatchupsFn = yield getContext("getMatchups");
	const logger: Logger = yield getContext("logger");

	// todo turn this into a `call` so it waits for all players

	players.getAll().forEach((p) => p.put(playerBeforeReadyPhaseEvent()));

	yield delay(500);

	const matchups = getMatchups();

	matchups.forEach(({ homeId, awayId, awayIsClone }) => {
		const homePlayer = players.getById(homeId);
		const awayPlayer = players.getById(awayId);

		// todo add logging here
		if (!homePlayer || !awayPlayer) {
			return;
		}

		const match = new Match(
			homePlayer,
			awayPlayer,
			awayIsClone,
			logger,
			options
		);

		homePlayer.put(playerRunReadyPhaseEvent({ match }));

		if (!awayIsClone) {
			awayPlayer.put(playerRunReadyPhaseEvent({ match }));
		}
	});

	const phase = GamePhase.READY;
	const startedAt = Date.now() / 1000;
	yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

	yield delay(options.phaseLengths[GamePhase.READY] * 1000);
};
