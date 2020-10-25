import { fork, all } from "@redux-saga/core/effects";
import { authSaga } from "../auth";
import { findGame } from "../menu/findGame";

export const rootSaga = function*() {
    yield all([
        yield fork(authSaga),
        yield fork(findGame)
    ]);
};
