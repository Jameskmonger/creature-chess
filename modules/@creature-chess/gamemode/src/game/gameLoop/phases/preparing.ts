import delay from "delay";

import { GamePhase } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { playerRunPreparingPhaseEvent } from "../../events";
import { readyNotifier } from "../../readyNotifier";
import { GameContextPlayers } from "../../gameContext";
import { Gamemode } from "../../gamemode";

export const runPreparingPhase = async (
	gamemode: Gamemode,
	players: GameContextPlayers,
	settings: GamemodeSettings
) => {
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
		delay(settings.preparingPhaseLengthMs),
	]);

	notifier.dispose();
};
