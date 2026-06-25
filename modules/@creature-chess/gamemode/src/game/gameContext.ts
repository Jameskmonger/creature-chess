import { Logger } from "@cc-engine/kernel";
import delay from "delay";

import { GamemodeSettings } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { Gamemode } from "./gamemode";
import { PlayerRound } from "./playerRound";
import { Round, RoundCallbacks } from "./round";

export type GetMatchupsFn = () => {
	homeId: string;
	awayId: string;
	awayIsClone: boolean;
}[];

export type GameContext = {
	gamemode: Gamemode;
	getMatchups: GetMatchupsFn;
	players: {
		getAll: () => Player[];
		getLiving: () => Player[];
		getById: (id: string) => Player | null;
	};
	logger: Logger;
	settings: GamemodeSettings;
	playerRound: PlayerRound;
};

export type GameContextPlayers = GameContext["players"];

// todo move this
const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
	const end = process.hrtime(start);
	return Math.round(end[0] * 1000 + end[1] / 1000000);
};

const runGameLoop = async (
	context: GameContext,
	callbacks: RoundCallbacks = {}
) => {
	const { gamemode, players } = context;

	let currentLastPosition = players.getAll().length;
	let currentRoundNumber = gamemode.roundInfo.round;

	const takeLastPlace = (player: Player) => {
		player.setFinishStanding({
			position: currentLastPosition,
			round: currentRoundNumber,
		});
		currentLastPosition--;
	};

	for (const player of players.getAll()) {
		player.events.onPlayerEvent("playerDeath", () => takeLastPlace(player));

		// Quitting is a forfeit: the player takes the current last place, exactly
		// as if knocked out there — unless they were already knocked out, in which
		// case that placement stands.
		player.events.onQuit(() => {
			if (player.finishPosition <= 0) {
				takeLastPlace(player);
			}
		});
	}

	while (true) {
		currentRoundNumber++;
		const round = new Round(currentRoundNumber, context, callbacks);
		await round.run();

		if (gamemode.isAborted()) {
			return null;
		}

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
	winner.setFinishStanding({ position: 1, round: currentRoundNumber });

	return players.getAll().map((p) => ({
		id: p.id,
		position: p.finishPosition,
		finishRound: p.finishRound,
	}));
};

export const runGame = async (
	context: GameContext,
	callbacks: RoundCallbacks = {}
) => {
	const { gamemode, players, logger, settings } = context;

	logger.info(
		`Game started with ${players.getAll().length} players: ${players
			.getAll()
			.map((p) => p.name)
			.join(", ")}`
	);

	if (settings.gameStartSettleMs > 0) {
		await delay(settings.gameStartSettleMs);
	}

	const startTime = startStopwatch();

	const gameResults = await runGameLoop(context, callbacks);

	// Aborted (headless layout-only driver): no standings, skip teardown/finish.
	if (gameResults === null) {
		return;
	}

	const duration = stopwatch(startTime);

	const round = gamemode.roundInfo.round;

	logger.info(`Match complete in ${duration} ms (${round} rounds)`);

	gamemode.finishGame({ players: gameResults });
};
