import { takeLatest, put } from "@redux-saga/core/effects";
import { GamePhaseUpdateAction, GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";
import { phaseStartSeconds } from "../../store/actions";

export const phaseTimer = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*(action) {
        const nowMs = action ? action.payload.startedAt : Date.now();
        const seconds = Math.floor(nowMs / 1000);
        yield put(phaseStartSeconds(seconds));
    });
};
