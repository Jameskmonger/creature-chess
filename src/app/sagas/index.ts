import { all, fork } from "@redux-saga/core/effects";
import { watchLobbyJoined } from "./lobbySaga";

export const rootSaga = function* root() {
    yield all([
        fork(watchLobbyJoined),
    ]);
};
