import { all, call } from "redux-saga/effects"
import { playerPreparingPhase } from "./preparing"

export const playerPhases = function*() {
    yield all([
        call(playerPreparingPhase)
    ]);
};
