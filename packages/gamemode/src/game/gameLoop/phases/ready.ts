import { put, delay, getContext } from "@redux-saga/core/effects";
import { GameOptions, GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { Match } from "../../match";
import { GameSagaContextPlayers, GetMatchupsFn } from "../../sagas";
import { playerRunReadyPhaseEvent } from "../../events";

export const runReadyPhase = function*() {
	const options: GameOptions = yield getContext("options");
	const players: GameSagaContextPlayers = yield getContext("players");
	const getMatchups: GetMatchupsFn = yield getContext("getMatchups");

	const matchups = getMatchups();

	matchups.forEach(({ homeId, awayId, awayIsClone }) => {
		const homePlayer = players.getById(homeId);
		const awayPlayer = players.getById(awayId);

		// todo add logging here
		if (!homePlayer || !awayPlayer) {
			return;
		}

		const match = new Match(homePlayer, awayPlayer, awayIsClone, options);

		homePlayer.receiveGameEvent(playerRunReadyPhaseEvent({ match }));

		if (!awayIsClone) {
			awayPlayer.receiveGameEvent(playerRunReadyPhaseEvent({ match }));
		}
	});

	const phase = GamePhase.READY;
	const startedAt = Date.now() / 1000;
	yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

	yield delay(options.phaseLengths[GamePhase.READY] * 1000);
};
