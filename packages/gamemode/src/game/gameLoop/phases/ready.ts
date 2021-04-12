import { put, delay } from "@redux-saga/core/effects";
import { GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { Match } from "../../match";
import { GameSagaDependencies } from "../../sagas";

export const runReadyPhase = function*({ getMatchups, options, players }: GameSagaDependencies) {
    const matchups = getMatchups();

    matchups.forEach(({ homeId, awayId, awayIsClone }) => {
        const homePlayer = players.getById(homeId);
        const awayPlayer = players.getById(awayId);

        const match = new Match(homePlayer, awayPlayer, options);

        homePlayer.enterReadyPhase(match);

        if (!awayIsClone) {
            awayPlayer.enterReadyPhase(match);
        }
    });

    const phase = GamePhase.READY;
    const startedAt = Date.now() / 1000;
    yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

    yield delay(options.phaseLengths[GamePhase.READY] * 1000);
};
