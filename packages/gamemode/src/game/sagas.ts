import { Logger } from "winston";
import { GameOptions } from "@creature-chess/models";
import { call, delay, getContext, put } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";
import { gameFinishEvent } from "./events";
import { GameState } from "./store";
import { gameLoopSaga } from "./gameLoop";
import { PlayerEntity } from "../entities";

export type GetMatchupsFn = () => { homeId: string; awayId: string; awayIsClone: boolean }[];

export type GameSagaContext = {
	getMatchups: GetMatchupsFn;
	options: GameOptions;
	players: {
		getAll: () => PlayerEntity[];
		getLiving: () => PlayerEntity[];
		getById: (id: string) => PlayerEntity | null;
	};
	logger: Logger;
};

export type GameSagaContextPlayers = GameSagaContext["players"];

// todo move this
const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
	const end = process.hrtime(start);
	return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

export const gameSaga = function*() {
	const players: GameSagaContextPlayers = yield getContext("players");
	const logger: Logger = yield getContext("logger");

	logger.info(`Game started with ${players.getAll().length} players: ${players.getAll().map(p => p.getVariable(v => v.name)).join(", ")}`);

	// this is to wait for the end of the execution queue. without it, things go a bit weird with observers
	// todo improve this
	yield delay(100);

	const startTime = startStopwatch();

	const { winnerId } = yield call(gameLoopSaga);

	const duration = stopwatch(startTime);

	const round = yield* select((state: GameState) => state.roundInfo.round);

	logger.info(`Match complete in ${(duration)} ms (${round} rounds)`);

	yield put(gameFinishEvent({ winnerId }));
};
