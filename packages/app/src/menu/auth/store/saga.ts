import { takeLatest, put, call } from "@redux-saga/core/effects";
import { SanitizedUser } from "@creature-chess/models";
import { getCurrentUser } from "../utils/getCurrentUser";
import { UserAuthenticatedAction, userUpdated, USER_AUTHENTICATED } from "./actions";

export const loadUserSaga = function*() {
    yield takeLatest<UserAuthenticatedAction>(
        USER_AUTHENTICATED,
        function*({ payload: { token } }) {
            const user: SanitizedUser = yield call(getCurrentUser, token);

            yield put(userUpdated(user));
        }
    )
};
