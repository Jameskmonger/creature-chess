import { fork, all } from "@redux-saga/core/effects";
import { networking } from "./actions/networking";
import { phaseTimer } from "./actions/phaseTimer";
import { processBattle } from "./actions/processBattle";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { cardShop } from "./actions/cardShop";
import { evolution } from "@common/board/sagas/evolution";

export const rootSaga = function*() {
    yield all([
        yield fork(networking),
        yield fork(phaseTimer),
        yield fork(processBattle),
        yield fork(preventAccidentalClose),
        yield fork(cardShop),
        yield fork(evolution)
    ]);
};
