import { takeEvery, takeLatest, call, put } from "@redux-saga/core/effects";
import { countdown } from "../utils/countdown";
import { JoinLobbyAction, updateLobbySecondsRemaining } from "../../actions/lobbyActions";
import { JOIN_LOBBY } from "../../actiontypes/lobbyActionTypes";

export const lobbyTimer = function*() {
    yield takeLatest<JoinLobbyAction>(JOIN_LOBBY, function*(action) {
        const startTimestamp = action.payload.startTimestamp;

        if (startTimestamp !== null) {
            const secondsRemaining = (startTimestamp - Date.now()) / 1000;

            yield put(updateLobbySecondsRemaining(secondsRemaining));

            const channel = yield call(countdown, secondsRemaining);

            yield takeEvery(channel, function*(secs: number) {
                yield put(updateLobbySecondsRemaining(secs));
            });
        }
    });
};
