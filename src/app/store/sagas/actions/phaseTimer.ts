import { takeLatest, put } from "@redux-saga/core/effects";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GamePhaseUpdateAction, phaseStartSeconds } from "../../actions/gameActions";

export const phaseTimer = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*() {
        const seconds = Math.floor(Date.now() / 1000);
        yield put(phaseStartSeconds(seconds));
    });
};
