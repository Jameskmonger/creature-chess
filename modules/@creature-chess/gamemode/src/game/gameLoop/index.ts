import { Store } from "@reduxjs/toolkit";

import { PlayerVariables } from "../../entities/player";
import { playerDeathEvent } from "../../entities/player/events";
import { GameContext } from "../gameContext";
import { GameState } from "../store";
import { runPlayingPhase, runPreparingPhase, runReadyPhase } from "./phases";

type Callbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export const gameLoop = async (store: Store<GameState>, context: GameContext, callbacks: Callbacks = {}) => {
	const { players } = context;

	let currentLastPosition = players.getAll().length;
	let currentRound = 0;

	for (const player of players.getAll()) {
		player.addListener({
			actionCreator: playerDeathEvent,
			effect: async (_action, api) => {
				api.extra.updateVariables({
					finishPosition: currentLastPosition,
					finishRound: currentRound,
				} as Partial<PlayerVariables>);

				currentLastPosition--;
			},
		});
	}

	while (true) {
		await runPreparingPhase(store, players);

		currentRound = store.getState().roundInfo.round;

		await runReadyPhase(store, context, callbacks);
		await runPlayingPhase(store, players, callbacks);

		if (players.getLiving().length < 2) {
			break;
		}
	}

	if (players.getLiving().length === 0) {
		console.log("Game finished, no winners");

		return players.getAll().map((p) => ({
			id: p.id,
			position: p.getVariable((v) => v.finishPosition),
			finishRound: p.getVariable((v) => v.finishRound),
		}));
	}

	const winner = players.getLiving()[0];
	winner.updateVariables({
		finishPosition: 1,
		finishRound: currentRound,
	} as Partial<PlayerVariables>);

	return players.getAll().map((p) => ({
		id: p.id,
		position: p.getVariable((v) => v.finishPosition),
		finishRound: p.getVariable((v) => v.finishRound),
	}));
};
