import { GamePhaseUpdateAction, GAME_PHASE_UPDATE, phaseStartSeconds } from "@creature-chess/shared/game/store/actions";
import { takeLatest, put } from "@redux-saga/core/effects";

export const phaseTimer = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*(action) {
        const nowMs = action ? action.payload.startedAt : Date.now();
        const seconds = Math.floor(nowMs / 1000);
        yield put(phaseStartSeconds(seconds));
    });
};
