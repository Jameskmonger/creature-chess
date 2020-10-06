import { fork, all, takeEvery, select } from "@redux-saga/core/effects";
import { authSaga } from "../auth";
import { networking } from "../game/sagas/networking/saga";
import { gameSagaFactory } from "../game";
import { SanitizedUser } from "@creature-chess/models";
import { AppState } from "./state";
import { JOIN_COMPLETE } from "../ui/actions";

export const rootSaga = function*() {
    yield all([
        yield fork(authSaga),
        yield fork(networking),
        yield takeEvery(
            JOIN_COMPLETE,
            function*() {
                const user: SanitizedUser = yield select((state: AppState) => state.auth.user);

                yield fork(gameSagaFactory(user.id));
            }
        )
    ]);
};