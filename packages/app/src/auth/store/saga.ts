import { take, call, put } from "@redux-saga/core/effects";
import { HANDLE_AUTHENTICATION_CALLBACK, sessionChecked, userAuthenticated } from "./actions";
import { AuthResponse, checkSession, handleAuthentication } from "../auth0";

export const authSaga = function*() {
    const existingSession: AuthResponse = yield call(checkSession);

    if (existingSession) {
        yield put(userAuthenticated(existingSession.token, existingSession.expiry));

        return;
    }

    yield put(sessionChecked());

    yield take(HANDLE_AUTHENTICATION_CALLBACK);

    const newSession: AuthResponse = yield call(handleAuthentication);
    yield put(userAuthenticated(newSession.token, newSession.expiry));
};
