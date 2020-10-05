import { fork, all, takeEvery } from "@redux-saga/core/effects";
import { authSaga } from "../auth";
import { networking } from "../game/sagas/networking/saga";
import { gameSagaFactory } from "../game";
import { JoinCompleteAction } from "./actions/localPlayerActions";
import { JOIN_COMPLETE } from "./actiontypes/localPlayerActionTypes";

export const rootSaga = function*() {
    yield all([
        yield fork(authSaga),
        yield fork(networking),
        yield takeEvery<JoinCompleteAction>(
            JOIN_COMPLETE,
            function*({ payload: { playerId }}) {
                yield fork(gameSagaFactory(playerId));
            }
        )
    ]);
};
