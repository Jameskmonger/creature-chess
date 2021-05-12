import pDefer = require("p-defer");
import { put, getContext, take, race, all } from "@redux-saga/core/effects";
import delay from "delay";
import { GameOptions, GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../../roundInfo";
import { GameSagaContextPlayers } from "../../sagas";
import { playerFinishMatchEvent } from "../../../player/events";

const waitForFinishMatchSaga = function*() {
    yield take(playerFinishMatchEvent.toString());
};

export const runPlayingPhase = function*() {
    const options: GameOptions = yield getContext("options");
    const players: GameSagaContextPlayers = yield getContext("players");

    const battleTimeoutDeferred = pDefer<void>();

    const phase = GamePhase.PLAYING;
    delay(options.phaseLengths[GamePhase.PLAYING] * 1000).then(() => battleTimeoutDeferred.resolve());

    const startedAt = Date.now() / 1000;

    yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

    const livingPlayers = players.getLiving();

    const matches = [...new Set(livingPlayers.map(p => p.getMatch()))];
    const finishMatchTasks = livingPlayers.map(p => p.runSaga(waitForFinishMatchSaga));

    matches.forEach(m => m.fight(battleTimeoutDeferred.promise));

    yield all(finishMatchTasks);

    // some battles go right up to the end, so it's nice to have a delay
    // rather than jumping straight into the next phase
    yield delay(5000);
};
