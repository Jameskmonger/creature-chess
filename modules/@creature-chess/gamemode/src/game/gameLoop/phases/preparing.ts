import delay from "delay";

import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_LENGTHS } from "@creature-chess/models/config";

import { playerRunPreparingPhaseEvent } from "../../events";
import { readyNotifier } from "../../readyNotifier";
import { GameContextPlayers } from "../../gameContext";
import { Gamemode } from "../../gamemode";

export const runPreparingPhase = async (gamemode: Gamemode, players: GameContextPlayers) => {
	const round = gamemode.roundInfo.round;

	const phase = GamePhase.PREPARING;
	const startedAt = Date.now() / 1000;

	gamemode.setRoundInfo({
		phase,
		startedAt,
		round: round + 1,
	});

	players.getLiving().forEach((p) => p.put(playerRunPreparingPhaseEvent()));

	const notifier = readyNotifier(players.getLiving());

	await Promise.race([
		notifier.promise,
		delay(GAME_PHASE_LENGTHS[GamePhase.PREPARING] * 1000),
	]);

	notifier.dispose();
};
