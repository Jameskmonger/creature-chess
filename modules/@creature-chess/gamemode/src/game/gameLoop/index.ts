import { playerDeathEvent } from "../../entities/player/events";
import { GameContext } from "../gameContext";
import { runPlayingPhase, runPreparingPhase, runReadyPhase } from "./phases";

type Callbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export const gameLoop = async (
	context: GameContext,
	callbacks: Callbacks = {}
) => {
	const { gamemode, players, settings } = context;

	let currentLastPosition = players.getAll().length;
	let currentRound = 0;

	for (const player of players.getAll()) {
		player.addListener({
			actionCreator: playerDeathEvent,
			effect: async (_action, api) => {
				api.player.finishPosition = currentLastPosition;
				api.player.finishRound = currentRound;

				currentLastPosition--;
			},
		});
	}

	while (true) {
		await runPreparingPhase(gamemode, players, settings);

		currentRound = gamemode.roundInfo.round;

		await runReadyPhase(context, callbacks);
		await runPlayingPhase(gamemode, players, settings, callbacks);

		if (players.getLiving().length < 2) {
			break;
		}
	}

	if (players.getLiving().length === 0) {
		console.log("Game finished, no winners");

		return players.getAll().map((p) => ({
			id: p.id,
			position: p.finishPosition,
			finishRound: p.finishRound,
		}));
	}

	const winner = players.getLiving()[0];
	winner.finishPosition = 1;
	winner.finishRound = currentRound;

	return players.getAll().map((p) => ({
		id: p.id,
		position: p.finishPosition,
		finishRound: p.finishRound,
	}));
};
