import { takeEvery, takeLatest, call, put } from "@redux-saga/core/effects";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { Constants } from "@common";
import { countdown } from "../utils/countdown";
import { GamePhaseUpdateAction, phaseTimerUpdated } from "../../actions/gameActions";

export const phaseTimer = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*(action) {
        const phaseLength = Constants.PHASE_LENGTHS[action.payload.phase];

        if (phaseLength) {
            yield put(phaseTimerUpdated(phaseLength));

            const channel = yield call(countdown, phaseLength);

            yield takeEvery(channel, function*(secs: number) {
                yield put(phaseTimerUpdated(secs));
            });
        }
    });
};
