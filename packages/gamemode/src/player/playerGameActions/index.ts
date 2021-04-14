import { fork } from "@redux-saga/core/effects";

import { buyCardPlayerActionSaga, BuyCardPlayerAction, buyCardPlayerAction } from "./buyCard";
export { BuyCardPlayerAction, buyCardPlayerAction };

export const playerGameActionsSaga = function*() {
    yield fork(buyCardPlayerActionSaga);
};

export const PlayerGameActionTypesArray = [
    buyCardPlayerAction.toString()
];
