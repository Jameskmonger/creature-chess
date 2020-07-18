import { takeLatest, put } from "@redux-saga/core/effects";
import { phaseStartSeconds } from "../../actions/gameActions";
import { GamePhaseUpdateAction, GAME_PHASE_UPDATE } from "@common/player/gameInfo";

export const phaseTimer = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*() {
        const seconds = Math.floor(Date.now() / 1000);
        yield put(phaseStartSeconds(seconds));
    });
};
