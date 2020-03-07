import { takeLatest, put } from "@redux-saga/core/effects";
import { JoinLobbyAction, updateLobbyStartMs } from "../../actions/lobbyActions";
import { JOIN_LOBBY } from "../../actiontypes/lobbyActionTypes";

export const lobbyTimer = function*() {
    yield takeLatest<JoinLobbyAction>(JOIN_LOBBY, function*(action) {
        const startTimestamp = action.payload.startTimestamp;

        if (startTimestamp !== null) {
            yield put(updateLobbyStartMs(startTimestamp));
        }
    });
};
