import { take, call, put } from "@redux-saga/core/effects";
import { HANDLE_AUTHENTICATION_CALLBACK, sessionChecked, userLoaded } from "./actions";
import { checkSession, handleAuthentication } from "../auth0";

export const authSaga = function*() {
    const existingAuthInfo = yield call(checkSession);

    if (existingAuthInfo) {
        yield put(userLoaded(existingAuthInfo));
    } else {
        yield put(sessionChecked());

        yield take(HANDLE_AUTHENTICATION_CALLBACK);

        const authInfo = yield call(handleAuthentication);
        yield put(userLoaded(authInfo));
    }
};
