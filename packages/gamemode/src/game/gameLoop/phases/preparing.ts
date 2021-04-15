import { select, race, put , delay } from "@redux-saga/core/effects";
import { GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { readyNotifier } from "../../readyNotifier";
import { GameSagaDependencies } from "../../sagas";

export const runPreparingPhase = function*({ options, players }: GameSagaDependencies) {
    const round: number = yield select(state => state.roundInfo.round);

    const phase = GamePhase.PREPARING;
    const startedAt = Date.now() / 1000;

    yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt, round: round + 1 }));

    players.getLiving().forEach(p => p.enterPreparingPhase());

    const notifier = readyNotifier(players.getLiving());

    yield race([
        notifier.promise,
        delay(options.phaseLengths[GamePhase.PREPARING] * 1000)
    ]);

    notifier.dispose();

    players.getLiving().forEach(p => p.fillBoard());
};
