import { select, race, put , delay } from "@redux-saga/core/effects";
import { GamePhase, PlayerStatus } from "@creature-chess/models";
import { GameInfoCommands } from "../../gameInfo";
import { Player } from "../../player";
import { readyNotifier } from "../../readyNotifier";

const getLivingPlayers = (players: Player[]) => players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());

export const runPreparingPhase = function*(players: Player[], phaseLengthMs: number) {
    const round: number = yield select(state => state.gameInfo.round);

    const phase = GamePhase.PREPARING;
    const startedAt = Date.now() / 1000;

    yield put(GameInfoCommands.setGameInfoCommand({ phase, startedAt, round: round + 1 }));

    getLivingPlayers(players).forEach(p => p.enterPreparingPhase());

    const notifier = readyNotifier(players);

    yield race([
        notifier.promise,
        delay(phaseLengthMs)
    ]);

    notifier.dispose();

    getLivingPlayers(players).forEach(p => p.fillBoard());
};
