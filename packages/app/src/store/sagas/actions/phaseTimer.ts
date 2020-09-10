import { takeLatest, put } from "@redux-saga/core/effects";
import { phaseStartSeconds } from "../../actions/gameActions";
import { GamePhaseUpdateAction, GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";

export const phaseTimer = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*(action) {
        const nowMs = action ? action.payload.startedAt : Date.now();
        const seconds = Math.floor(nowMs / 1000);
        yield put(phaseStartSeconds(seconds));
    });
};
