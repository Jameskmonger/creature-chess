import { fork, all } from "@redux-saga/core/effects";
import { networking } from "./actions/networking";
import { phaseTimer } from "./actions/phaseTimer";
import { processBattle } from "./actions/process-battle";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { cardShop } from "./actions/cardShop";

export const rootSaga = function*() {
    yield all([
        yield fork(networking),
        yield fork(phaseTimer),
        yield fork(processBattle),
        yield fork(preventAccidentalClose),
        yield fork(cardShop)
    ]);
};
