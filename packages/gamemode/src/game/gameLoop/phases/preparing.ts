import { select, race, put, delay, getContext } from "@redux-saga/core/effects";
import { GameOptions, GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { readyNotifier } from "../../readyNotifier";
import { GameSagaContextPlayers } from "../../sagas";
import { playerRunPreparingPhaseEvent } from "../../events";

export const runPreparingPhase = function*() {
	const options: GameOptions = yield getContext("options");
	const players: GameSagaContextPlayers = yield getContext("players");

	const round: number = yield select(state => state.roundInfo.round);

	const phase = GamePhase.PREPARING;
	const startedAt = Date.now() / 1000;

	// todo put gamePhaseStartedEvent here?
	yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt, round: round + 1 }));

	players.getLiving().forEach(p => p.put(playerRunPreparingPhaseEvent()));

	const notifier = readyNotifier(players.getLiving());

	yield race([
		notifier.promise,
		delay(options.phaseLengths[GamePhase.PREPARING] * 1000)
	]);

	notifier.dispose();
};
