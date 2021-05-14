import pDefer = require("p-defer");
import { put, getContext, take } from "@redux-saga/core/effects";
import delay from "delay";
import { GameOptions, GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { GameSagaContextPlayers } from "../../sagas";
import { playerFinishMatchEvent } from "../../events";
import { Match } from "../../match";
import { getMatch } from "../../../features/match";
import { SagaGenerator, all, call } from "typed-redux-saga";
import { getMatches } from "../../../features/match/selectors";

const waitForFinishMatchSaga = function*() {
	yield take(playerFinishMatchEvent.toString());
};

export const runPlayingPhase = function*() {
	const options: GameOptions = yield getContext("options");
	const players: GameSagaContextPlayers = yield getContext("players");

	const battleTimeoutDeferred = pDefer<void>();

	const phase = GamePhase.PLAYING;
	delay(options.phaseLengths[GamePhase.PLAYING] * 1000).then(() => battleTimeoutDeferred.resolve());

	const startedAt = Date.now() / 1000;

	yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

	const livingPlayers = players.getLiving();

	const matches = yield* call(getMatches, livingPlayers);

	const uniqueMatches = [
		...new Set(
			matches.filter((match): match is Match => match !== null)
		)
	];
	const finishMatchTasks = livingPlayers.map(p => p.runSaga(waitForFinishMatchSaga));

	uniqueMatches.forEach(m => m.fight(battleTimeoutDeferred.promise));

	yield Promise.all(finishMatchTasks.map(t => t.toPromise()));

	// some battles go right up to the end, so it's nice to have a delay
	// rather than jumping straight into the next phase
	yield delay(5000);
};
