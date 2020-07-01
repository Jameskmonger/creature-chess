import { takeLatest, call, put } from "@redux-saga/core/effects";
import { HANDLE_AUTHENTICATION_CALLBACK, userLoaded } from "@app/store/actions/authActions";
import { handleAuthentication } from "@app/auth/auth0";

export const auth = function*() {
    yield takeLatest(
        HANDLE_AUTHENTICATION_CALLBACK,
        function* parseHash() {
            const authInfo = yield call(handleAuthentication);

            yield put(userLoaded(authInfo));
        }
    );
};
