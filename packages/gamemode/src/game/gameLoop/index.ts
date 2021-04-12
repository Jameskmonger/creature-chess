import { call } from "@redux-saga/core/effects";
import { GameSagaDependencies } from "../sagas";
import { runPlayingPhase, runPreparingPhase, runReadyPhase } from "./phases";

export const gameLoopSaga = function*(dependencies: GameSagaDependencies) {
    while (true) {
        yield call(runPreparingPhase, dependencies);

        yield call(runReadyPhase, dependencies);

        yield call(runPlayingPhase, dependencies);

        if (dependencies.players.getLiving().length < 2) {
            break;
        }
    }

    const winnerId = dependencies.players.getAll()[0].id;

    return {
        winnerId
    };
};
