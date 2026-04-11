import delay from "delay";
import pDefer from "p-defer";

import { GamePhase } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import {
	playerFinishMatchEvent,
} from "../../../entities/player/events";
import { getMatches } from "../../../features/match/selectors";
import { Match } from "../../match";
import { GameContextPlayers } from "../../gameContext";
import { Gamemode } from "../../gamemode";

type Callbacks = {
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export const runPlayingPhase = async (
	gamemode: Gamemode,
	players: GameContextPlayers,
	settings: GamemodeSettings,
	callbacks: Callbacks = {}
) => {
	const battleTimeoutDeferred = pDefer<void>();

	const phase = GamePhase.PLAYING;
	delay(settings.playingPhaseMaxLengthMs).then(() =>
		battleTimeoutDeferred.resolve()
	);

	const startedAt = Date.now() / 1000;

	gamemode.setRoundInfo({ phase, startedAt });

	const livingPlayers = players.getLiving();

	const matches = getMatches(livingPlayers);

	const uniqueMatches = [
		...new Set(matches.filter((match): match is Match => match !== null)),
	];

	const finishMatchTasks = livingPlayers.map((p) =>
		p.runEffect(async (api) => {
			await api.take((a) => a.type === playerFinishMatchEvent.type);
		})
	);

	uniqueMatches.forEach((m) => {
		if (callbacks.onMatchStart) {
			callbacks.onMatchStart();
		}

		m.fight(battleTimeoutDeferred.promise).then(() => {
			if (callbacks.onMatchEnd) {
				callbacks.onMatchEnd();
			}
		});
	});

	await Promise.all(finishMatchTasks.map((t) => t.promise));

	// some battles go right up to the end, so it's nice to have a delay
	// rather than jumping straight into the next phase
	await delay(settings.playingPhaseEndDelayMs);
};
