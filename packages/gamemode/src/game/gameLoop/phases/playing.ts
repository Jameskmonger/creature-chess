import pDefer = require("p-defer");
import { put, getContext } from "@redux-saga/core/effects";
import delay from "delay";
import { GameOptions, GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
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

    // some battles go right up to the end, so it's nice to have a delay
    // rather than jumping straight into the next phase
    yield delay(5000);
};
