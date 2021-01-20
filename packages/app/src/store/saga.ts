import { all, call } from "@redux-saga/core/effects";
import { findGame } from "../menu/findGame";
import { loadUserSaga } from "../menu/auth/store/saga";

export const rootSaga = function*(getAccessTokenSilently: () => Promise<string>, loginWithRedirect: () => Promise<void>) {
    yield all([
        call(loadUserSaga),
        call(findGame, getAccessTokenSilently, loginWithRedirect)
    ]);
};
