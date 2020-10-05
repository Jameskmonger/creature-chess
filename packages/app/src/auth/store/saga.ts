import { take, call, put } from "@redux-saga/core/effects";
import { HANDLE_AUTHENTICATION_CALLBACK, sessionChecked, userAuthenticated } from "./actions";
import { AuthResponse, checkSession, handleAuthentication } from "../auth0";
import { getCurrentUser } from "../utils/getCurrentUser";
import { SanitizedUser } from "@creature-chess/models";

export const authSaga = function*() {
    const existingSession: AuthResponse = yield call(checkSession);

    if (existingSession) {
        const user: SanitizedUser = yield call(getCurrentUser, existingSession.token);

        yield put(userAuthenticated(existingSession.token, existingSession.expiry, user));

        return;
    }

    yield put(sessionChecked());

    yield take(HANDLE_AUTHENTICATION_CALLBACK);

    const newSession: AuthResponse = yield call(handleAuthentication);
    const newUser: SanitizedUser = yield call(getCurrentUser, newSession.token);
    yield put(userAuthenticated(newSession.token, newSession.expiry, newUser));
};
