import { takeEvery, call, put } from "@redux-saga/core/effects";
import { joinGameAction, joinCompleteAction } from "../actions/lobbyActions";
import { joinGame } from "../components/stages/game-stage";

export function* watchLobbyJoined() {
    yield takeEvery(joinGameAction, requestGameState);
}

function* requestGameState() {
    const joined = yield call(joinGame);
    yield put(joinCompleteAction(joined));
}
