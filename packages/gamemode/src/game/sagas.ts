import { Logger } from "winston";
import { GameOptions } from "@creature-chess/models";
import { Player } from "../player";
import { call, getContext, put, select } from "@redux-saga/core/effects";
import { GameEvent, gameFinishEvent } from "./events";
import { GameState } from "./store";
import { gameLoopSaga } from "./gameLoop";

export type GetMatchupsFn = () => { homeId: string, awayId: string, awayIsClone: boolean }[];

export type GameSagaContext = {
    getMatchups: GetMatchupsFn;
    options: GameOptions;
    players: {
        getAll: () => Player[];
        getLiving: () => Player[];
        getById: (id: string) => Player | null;
        broadcast: (event: GameEvent) => void;
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

    const startTime = startStopwatch();

    logger.info(`Game started with ${players.getAll().length} players: ${players.getAll().map(p => p.name).join(", ")}`);

    const { winnerId } = yield call(gameLoopSaga);

    const duration = stopwatch(startTime);

    const round = yield select((state: GameState) => state.roundInfo.round);

    logger.info(`Match complete in ${(duration)} ms (${round} rounds)`);

    yield put(gameFinishEvent({ winnerId }));
};
