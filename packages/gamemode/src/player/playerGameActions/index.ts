import { fork } from "@redux-saga/core/effects";

import { buyCardPlayerActionSaga, BuyCardPlayerAction, buyCardPlayerAction } from "./buyCard";
export { BuyCardPlayerAction, buyCardPlayerAction };

import { buyXpPlayerActionSaga, BuyXpPlayerAction, buyXpPlayerAction } from "./buyXp";
export { BuyXpPlayerAction, buyXpPlayerAction };

import { rerollCardsPlayerActionSaga, RerollCardsPlayerAction, rerollCardsPlayerAction } from "./rerollCards";
export { RerollCardsPlayerAction, rerollCardsPlayerAction };

import { toggleShopLockPlayerActionSaga, ToggleShopLockPlayerAction, toggleShopLockPlayerAction } from "./toggleShopLock";
export { ToggleShopLockPlayerAction, toggleShopLockPlayerAction };

export const playerGameActionsSaga = function*() {
    yield fork(buyXpPlayerActionSaga);
    yield fork(buyCardPlayerActionSaga);
    yield fork(rerollCardsPlayerActionSaga);
    yield fork(toggleShopLockPlayerActionSaga);
};

export const PlayerGameActionTypesArray = [
    buyXpPlayerAction.toString(),
    buyCardPlayerAction.toString(),
    rerollCardsPlayerAction.toString(),
    toggleShopLockPlayerAction.toString(),
];
