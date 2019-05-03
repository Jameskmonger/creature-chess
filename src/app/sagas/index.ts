import { fork, all } from "@redux-saga/core/effects";
import { networking } from "./actions/networking";
import { notifications } from "./actions/notifications";
import { processBattle } from "./actions/process-battle";

export const rootSaga = function*() {
    yield all([
        yield fork(networking),
        yield fork(notifications),
        yield fork(processBattle)
    ]);
};
