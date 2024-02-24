import { select, race, put, delay, getContext } from "@redux-saga/core/effects";

import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_LENGTHS } from "@creature-chess/models/config";

import { playerRunPreparingPhaseEvent } from "../../events";
import { readyNotifier } from "../../readyNotifier";
import { RoundInfoCommands } from "../../roundInfo";
import { GameSagaContextPlayers } from "../../sagas";

export const runPreparingPhase = function* () {
	const players: GameSagaContextPlayers = yield getContext("players");

	const round: number = yield select((state) => state.roundInfo.round);

	const phase = GamePhase.PREPARING;
	const startedAt = Date.now() / 1000;

	// todo put gamePhaseStartedEvent here?
	yield put(
		RoundInfoCommands.setRoundInfoCommand({
			phase,
			startedAt,
			round: round + 1,
		})
	);

	players.getLiving().forEach((p) => p.put(playerRunPreparingPhaseEvent()));

	const notifier = readyNotifier(players.getLiving());

	yield race([
		notifier.promise,
		delay(GAME_PHASE_LENGTHS[GamePhase.PREPARING] * 1000),
	]);

	notifier.dispose();
};
