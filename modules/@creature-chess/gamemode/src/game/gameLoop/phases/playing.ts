import delay from "delay";
import pDefer from "p-defer";

import { GamePhase } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { playerFinishMatchEvent } from "../../../entities/player/events";
import { getMatches } from "../../../features/match/selectors";
import { GameContextPlayers } from "../../gameContext";
import { Gamemode } from "../../gamemode";
import { Match } from "../../match";

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
	const phase = GamePhase.PLAYING;

	let battleTimeout: Promise<void>;

	if (settings.playingPhaseMaxLengthMs > 0) {
		const deferred = pDefer<void>();

		battleTimeout = deferred.promise;

		delay(settings.playingPhaseMaxLengthMs).then(() =>
			deferred.resolve()
		);
	} else {
		battleTimeout = Promise.resolve();
	}

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

		m.fight(battleTimeout).then(() => {
			if (callbacks.onMatchEnd) {
				callbacks.onMatchEnd();
			}
		});
	});

	await Promise.all(finishMatchTasks.map((t) => t.promise));

	// some battles go right up to the end, so it's nice to have a delay
	// rather than jumping straight into the next phase
	if (settings.playingPhaseEndDelayMs > 0) {
		await delay(settings.playingPhaseEndDelayMs);
	}
};
