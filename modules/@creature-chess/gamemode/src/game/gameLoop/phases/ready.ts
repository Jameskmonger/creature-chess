import delay from "delay";
import { Store } from "@reduxjs/toolkit";

import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_LENGTHS } from "@creature-chess/models/config";

import {
	playerBeforeReadyPhaseEvent,
	playerRunReadyPhaseEvent,
} from "../../events";
import { Match } from "../../match";
import { RoundInfoCommands } from "../../roundInfo";
import { GameContext } from "../../gameContext";
import { GameState } from "../../store";

type Callbacks = {
	onTurnComplete?: (timeMs: number) => void;
};

export const runReadyPhase = async (store: Store<GameState>, context: GameContext, callbacks: Callbacks = {}) => {
	const { players, getMatchups, logger, settings, gamemode } = context;

	// todo turn this into something that waits for all players
	players.getAll().forEach((p) => p.put(playerBeforeReadyPhaseEvent()));

	await delay(500);

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
	store.dispatch(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

	await delay(GAME_PHASE_LENGTHS[GamePhase.READY] * 1000);
};
