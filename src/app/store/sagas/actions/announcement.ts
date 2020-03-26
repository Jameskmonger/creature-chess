import { takeLatest, put, select } from "@redux-saga/core/effects";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GamePhase } from "@common/models";
import { GamePhaseUpdateAction, clearAnnouncement, updateAnnouncement } from "../../actions/gameActions";
import { AppState } from "../../state";

export const announcement = function*() {
    yield takeLatest<GamePhaseUpdateAction>(GAME_PHASE_UPDATE, function*(action) {
        if (action.payload.phase === GamePhase.READY) {
            const state: AppState = yield select();

            const opponentId = action.payload.payload.opponentId;
            const opponent = state.playerList.find(p => p.id === opponentId);

            if (!opponent) {
                return;
            }

            yield put(updateAnnouncement(opponent.name, "Now Playing"));
        } else if (action.payload.phase === GamePhase.PLAYING) {
            yield put(clearAnnouncement());
        }
    });
};
