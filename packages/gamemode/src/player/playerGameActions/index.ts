import { fork } from "@redux-saga/core/effects";

import { buyCardPlayerActionSaga, BuyCardPlayerAction, buyCardPlayerAction } from "./buyCard";
export { BuyCardPlayerAction, buyCardPlayerAction };

import { buyXpPlayerActionSaga, BuyXpPlayerAction, buyXpPlayerAction } from "./buyXp";
export { BuyXpPlayerAction, buyXpPlayerAction };

import { rerollCardsPlayerActionSaga, RerollCardsPlayerAction, rerollCardsPlayerAction } from "./rerollCards";
export { RerollCardsPlayerAction, rerollCardsPlayerAction };

import { toggleShopLockPlayerActionSaga, ToggleShopLockPlayerAction, toggleShopLockPlayerAction } from "./toggleShopLock";
export { ToggleShopLockPlayerAction, toggleShopLockPlayerAction };

import { sellPiecePlayerActionSaga, SellPiecePlayerAction, sellPiecePlayerAction } from "./sellPiece";
export { SellPiecePlayerAction, sellPiecePlayerAction };

import { ReadyUpPlayerAction, readyUpPlayerAction } from "./readyUp";
export { ReadyUpPlayerAction, readyUpPlayerAction };

import { QuitGamePlayerAction, quitGamePlayerAction } from "./quitGame";
export { QuitGamePlayerAction, quitGamePlayerAction };

import { dropPiecePlayerActionSaga, DropPiecePlayerAction, dropPiecePlayerAction } from "./dropPiece";
export { DropPiecePlayerAction, dropPiecePlayerAction };

export const playerGameActionsSaga = function*() {
	yield fork(buyXpPlayerActionSaga);
	yield fork(buyCardPlayerActionSaga);
	yield fork(rerollCardsPlayerActionSaga);
	yield fork(toggleShopLockPlayerActionSaga);
	yield fork(sellPiecePlayerActionSaga);
	yield fork(dropPiecePlayerActionSaga);
};

export const PlayerGameActionTypesArray = [
	buyXpPlayerAction.toString(),
	buyCardPlayerAction.toString(),
	rerollCardsPlayerAction.toString(),
	toggleShopLockPlayerAction.toString(),
	sellPiecePlayerAction.toString(),
	readyUpPlayerAction.toString(),
	quitGamePlayerAction.toString(),
	dropPiecePlayerAction.toString()
];

export type PlayerGameAction =
	BuyXpPlayerAction
	| BuyCardPlayerAction
	| RerollCardsPlayerAction
	| ToggleShopLockPlayerAction
	| SellPiecePlayerAction
	| ReadyUpPlayerAction
	| QuitGamePlayerAction
	| DropPiecePlayerAction;
