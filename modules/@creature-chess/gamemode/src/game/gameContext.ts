import delay from "delay";
import { Logger } from "winston";

import { GamemodeSettings } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { gameLoop } from "./gameLoop";
import { Gamemode } from "./gamemode";

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
};

export type GameContextPlayers = GameContext["players"];

// todo move this
const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
	const end = process.hrtime(start);
	return Math.round(end[0] * 1000 + end[1] / 1000000);
};

type Callbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export const runGame = async (context: GameContext, callbacks: Callbacks = {}) => {
	const { gamemode, players, logger } = context;

	logger.info(
		`Game started with ${players.getAll().length} players: ${players
			.getAll()
			.map((p) => p.name)
			.join(", ")}`
	);

	// this is to wait for the end of the execution queue. without it, things go a bit weird with observers
	// todo improve this
	await delay(100);

	const startTime = startStopwatch();

	const gameResults = await gameLoop(context, callbacks);

	const duration = stopwatch(startTime);

	const round = gamemode.roundInfo.round;

	logger.info(`Match complete in ${duration} ms (${round} rounds)`);

	gamemode.finishGame({ players: gameResults });
};
