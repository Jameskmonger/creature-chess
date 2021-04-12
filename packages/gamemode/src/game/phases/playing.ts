import pDefer = require("p-defer");
import { select, put } from "@redux-saga/core/effects";
import delay from "delay";
import { GamePhase, PlayerStatus } from "@creature-chess/models";
import { RoundInfoCommands } from "../roundInfo";
import { Player } from "../../player";

const getLivingPlayers = (players: Player[]) => players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());

export const runPlayingPhase = function*(players: Player[], phaseLengthMs: number) {
    const battleTimeoutDeferred = pDefer<void>();
    delay(phaseLengthMs).then(() => battleTimeoutDeferred.resolve());

    const phase = GamePhase.PLAYING;
    const startedAt = Date.now() / 1000;

    yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

    const promises = getLivingPlayers(players).map(p => p.fightMatch(startedAt, battleTimeoutDeferred));

    yield Promise.all(promises);

    const round: number = yield select(state => state.roundInfo.round);

    for (const player of players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === round)) {
        player.kill();
    }

    // some battles go right up to the end, so it's nice to have a delay
    // rather than jumping straight into the next phase
    yield delay(5000);
};
