import { fork, all, takeEvery, select } from "@redux-saga/core/effects";
import { authSaga } from "../auth";
import { networking } from "../game/sagas/networking/saga";
import { gameSagaFactory } from "../game";
import { SanitizedUser } from "@creature-chess/models";
import { AppState } from "./state";
import { UpdateConnectionStatusAction, UPDATE_CONNECTION_STATUS } from "../ui/actions";
import { ConnectionStatus } from "@creature-chess/shared";
import { findGame } from "../menu/findGame";

export const rootSaga = function*() {
    yield all([
        yield fork(authSaga),
        yield fork(findGame),
        yield takeEvery<UpdateConnectionStatusAction>(
            UPDATE_CONNECTION_STATUS,
            function*({ payload: { status } }) {
                if (status !== ConnectionStatus.CONNECTED) {
                    return;
                }

                const user: SanitizedUser = yield select((state: AppState) => state.auth.user);

                yield fork(gameSagaFactory(user.id));
            }
        )
    ]);
};
