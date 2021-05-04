import pDefer = require("p-defer");
import { select, put, getContext } from "@redux-saga/core/effects";
import delay from "delay";
import { GameOptions, GamePhase, PlayerStatus } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { GameState } from "../../store";
import { GameSagaContextPlayers } from "../../sagas";

export const runPlayingPhase = function*() {
    const options: GameOptions = yield getContext("options");
    const players: GameSagaContextPlayers = yield getContext("players");

    const battleTimeoutDeferred = pDefer<void>();

    const phase = GamePhase.PLAYING;
    delay(options.phaseLengths[GamePhase.PLAYING] * 1000).then(() => battleTimeoutDeferred.resolve());

    const startedAt = Date.now() / 1000;

    yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

    const promises = players.getLiving().map(p => p.fightMatch(startedAt, battleTimeoutDeferred));

    yield Promise.all(promises);

    const round: number = yield select((state: GameState) => state.roundInfo.round);

    for (const player of players.getAll().filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === round)) {
        player.kill();
    }

    // some battles go right up to the end, so it's nice to have a delay
    // rather than jumping straight into the next phase
    yield delay(5000);
};
