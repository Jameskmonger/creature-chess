import { all, call } from "redux-saga/effects";
import { playerPreparingPhase } from "./preparing";
import { playerReadyPhase } from "./ready";

export const playerPhases = function*() {
    yield all([
        call(playerPreparingPhase),
        call(playerReadyPhase)
    ]);
};
