import { getContext, takeLatest } from "@redux-saga/core/effects";
import { gamePhaseStartedEvent } from "./events";
import { RoundInfoCommands, SetRoundInfoCommand } from "./roundInfo";
import { GameSagaContextPlayers } from "./sagas";

export const sendPublicEventsSaga = function*() {
    yield takeLatest<SetRoundInfoCommand>(RoundInfoCommands.setRoundInfoCommand.toString(), function*({ payload }) {
        const { broadcast }: GameSagaContextPlayers = yield getContext("players");

        broadcast(gamePhaseStartedEvent(payload));
    });
};
