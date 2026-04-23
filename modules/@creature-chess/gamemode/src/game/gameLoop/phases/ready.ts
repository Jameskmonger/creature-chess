import delay from "delay";

import { GamePhase } from "@creature-chess/models";

import {
	playerBeforeReadyPhaseEvent,
	playerRunReadyPhaseEvent,
} from "../../events";
import { GameContext } from "../../gameContext";
import { Match } from "../../match";

type Callbacks = {
	onTurnComplete?: (timeMs: number) => void;
};

export const runReadyPhase = async (
	context: GameContext,
	callbacks: Callbacks = {}
) => {
	const { gamemode, players, getMatchups, logger, settings } = context;

	// todo turn this into something that waits for all players
	players.getAll().forEach((p) => p.put(playerBeforeReadyPhaseEvent()));

	if (settings.readyPhaseSettleMs > 0) {
		await delay(settings.readyPhaseSettleMs);
	}

	const matchups = getMatchups();

	matchups.forEach(({ homeId, awayId, awayIsClone }) => {
		const homePlayer = players.getById(homeId);
		const awayPlayer = players.getById(awayId);

		// todo add logging here
		if (!homePlayer || !awayPlayer) {
			return;
		}

		const match = new Match(
			gamemode.pieceRegistry,
			homePlayer,
			awayPlayer,
			awayIsClone,
			logger,
			settings,
			callbacks.onTurnComplete
		);

		homePlayer.put(playerRunReadyPhaseEvent({ match }));

		if (!awayIsClone) {
			awayPlayer.put(playerRunReadyPhaseEvent({ match }));
		}
	});

	const phase = GamePhase.READY;
	const startedAt = Date.now() / 1000;
	gamemode.setRoundInfo({ phase, startedAt });

	if (settings.readyPhaseLengthMs > 0) {
		await delay(settings.readyPhaseLengthMs);
	}
};
