import delay from "delay";
import pDefer from "p-defer";
import { call, take, put, getContext } from "typed-redux-saga";

import { GamePhase } from "@creature-chess/models";

import {
	PlayerFinishMatchEvent,
	playerFinishMatchEvent,
} from "../../../entities/player/events";
import { getMatches } from "../../../features/match/selectors";
import { Match } from "../../match";
import { RoundInfoCommands } from "../../roundInfo";
import { GameSagaContextPlayers } from "../../sagas";
import { GameOptions } from "@creature-chess/models/config";

const waitForFinishMatchSaga = function*() {
	yield* take<PlayerFinishMatchEvent>(playerFinishMatchEvent.toString());
};

export const runPlayingPhase = function*() {
	const options = yield* getContext<GameOptions>("options");
	const players = yield* getContext<GameSagaContextPlayers>("players");

	const battleTimeoutDeferred = pDefer<void>();

	const phase = GamePhase.PLAYING;
	delay(options.game.phaseLengths[GamePhase.PLAYING] * 1000).then(() =>
		battleTimeoutDeferred.resolve()
	);

	const startedAt = Date.now() / 1000;

	yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

	const livingPlayers = players.getLiving();

	const matches = yield* call(getMatches, livingPlayers);

	const uniqueMatches = [
		...new Set(matches.filter((match): match is Match => match !== null)),
	];
	const finishMatchTasks = livingPlayers.map((p) =>
		p.runSaga(waitForFinishMatchSaga)
	);

	uniqueMatches.forEach((m) => m.fight(battleTimeoutDeferred.promise));

	yield Promise.all(finishMatchTasks.map((t) => t.toPromise()));

	// some battles go right up to the end, so it's nice to have a delay
	// rather than jumping straight into the next phase
	yield delay(5000);
};
