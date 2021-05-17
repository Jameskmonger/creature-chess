import { all, put, delay, getContext } from "redux-saga/effects";
import { GameOptions, GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { Match } from "../../match";
import { GameSagaContextPlayers, GetMatchupsFn } from "../../sagas";
import { playerBeforeReadyPhaseEvent, playerRunReadyPhaseEvent } from "../../events";

export const runReadyPhase = function*() {
	const options: GameOptions = yield getContext("options");
	const players: GameSagaContextPlayers = yield getContext("players");
	const getMatchups: GetMatchupsFn = yield getContext("getMatchups");

	// todo turn this into a `call` so it waits for all players

	const tasks = players.getAll().map(p => p.runSaga(function*() {
		yield put(playerBeforeReadyPhaseEvent());
	}).toPromise());

	yield all([
		all(tasks),
		delay(500)
	]);

	const matchups = getMatchups();

	matchups.forEach(({ homeId, awayId, awayIsClone }) => {
		const homePlayer = players.getById(homeId);
		const awayPlayer = players.getById(awayId);

		// todo add logging here
		if (!homePlayer || !awayPlayer) {
			return;
		}

		const match = new Match(homePlayer, awayPlayer, awayIsClone, options);

		homePlayer.runSaga(function*() {
			yield put(playerRunReadyPhaseEvent({ match }));
		});

		if (!awayIsClone) {
			awayPlayer.runSaga(function*() {
				yield put(playerRunReadyPhaseEvent({ match }));
			});
		}
	});

	const phase = GamePhase.READY;
	const startedAt = Date.now() / 1000;
	yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

	yield delay(options.phaseLengths[GamePhase.READY] * 1000);
};
