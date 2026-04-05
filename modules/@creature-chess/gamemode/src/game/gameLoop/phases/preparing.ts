import delay from "delay";
import { Store } from "@reduxjs/toolkit";

import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_LENGTHS } from "@creature-chess/models/config";

import { playerRunPreparingPhaseEvent } from "../../events";
import { readyNotifier } from "../../readyNotifier";
import { RoundInfoCommands } from "../../roundInfo";
import { GameContextPlayers } from "../../gameContext";
import { GameState } from "../../store";

export const runPreparingPhase = async (store: Store<GameState>, players: GameContextPlayers) => {
	const round = store.getState().roundInfo.round;

	const phase = GamePhase.PREPARING;
	const startedAt = Date.now() / 1000;

	// todo put gamePhaseStartedEvent here?
	store.dispatch(
		RoundInfoCommands.setRoundInfoCommand({
			phase,
			startedAt,
			round: round + 1,
		})
	);

	players.getLiving().forEach((p) => p.put(playerRunPreparingPhaseEvent()));

	const notifier = readyNotifier(players.getLiving());

	await Promise.race([
		notifier.promise,
		delay(GAME_PHASE_LENGTHS[GamePhase.PREPARING] * 1000),
	]);

	notifier.dispose();
};
