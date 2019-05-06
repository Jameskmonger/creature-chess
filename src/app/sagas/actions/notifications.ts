import { takeEvery, takeLatest, call, put, all, fork, delay } from "@redux-saga/core/effects";
import { GAME_PHASE_UPDATE, BANNER_UPDATED } from "../../actiontypes/gameActionTypes";
import { GamePhase, Constants } from "@common";
import { ActionWithPayload } from "../types";
import { countdown } from "../utils/countdown";
import { bannerUpdatedAction, GamePhaseUpdateAction } from "../../actions/gameActions";

const sendNotifications = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*(action) {
        const phaseLength = Constants.PHASE_LENGTHS[action.payload.phase];

        if (phaseLength) {
            yield put(bannerUpdatedAction(`${GamePhase[action.payload.phase]}, ${phaseLength} seconds`));
        }

        const channel = yield call(countdown, phaseLength);
        yield takeEvery(channel, function*(secs) {
            yield put(bannerUpdatedAction(`${GamePhase[action.payload.phase]}, ${secs} seconds`));
        });
    });
};

const clearNotifications = function*() {
    yield takeLatest(BANNER_UPDATED, function*() {
        yield delay(1000);

        yield put(bannerUpdatedAction(null));
    });
};

export const notifications = function*() {
    yield all([
        yield fork(sendNotifications),
        yield fork(clearNotifications)
    ]);
};
