import { takeEvery, takeLatest, call, put, all, fork, delay } from "@redux-saga/core/effects";
import { GAME_STATE_UPDATE, BANNER_UPDATED } from "../../actiontypes/gameActionTypes";
import { GameState, Constants } from "@common";
import { ActionWithPayload } from "../types";
import { countdown } from "../utils/countdown";
import { bannerUpdatedAction } from "../../actions/gameActions";

const sendNotifications = function*() {
    yield takeLatest<ActionWithPayload<{ state: GameState }>>(GAME_STATE_UPDATE, function*(action) {
        const stateLength = Constants.STATE_LENGTHS[action.payload.state];

        if (stateLength) {
            yield put(bannerUpdatedAction(`${GameState[action.payload.state]}, ${stateLength} seconds`));
        }

        const channel = yield call(countdown, stateLength);
        yield takeEvery(channel, function*(secs) {
            yield put(bannerUpdatedAction(`${GameState[action.payload.state]}, ${secs} seconds`));
        });
    });
};

const clearNotifications = function*() {
    yield takeLatest(BANNER_UPDATED, function*() {
        yield delay(2500);

        yield put(bannerUpdatedAction(null));
    });
};

export const notifications = function*() {
    yield all([
        yield fork(sendNotifications),
        yield fork(clearNotifications)
    ]);
};
