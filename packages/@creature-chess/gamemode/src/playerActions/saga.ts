import { all, call } from "redux-saga/effects";

import { buyCardPlayerActionSaga } from "./buyCard";
import { buyXpPlayerActionSaga } from "./buyXp";
import { rerollCardsPlayerActionSaga } from "./rerollCards";
import { toggleShopLockPlayerActionSaga } from "./toggleShopLock";
import { sellPiecePlayerActionSaga } from "./sellPiece";
import { dropPiecePlayerActionSaga } from "./dropPiece";
import { swapPiecePlayerActionSaga } from "./swapPiece";
import { spectatePlayerActionSaga } from "./spectate";
import { readyUpPlayerActionSaga } from "./readyUp";
import { quickChatPlayerActionSaga } from "./quickChat";

export const playerActionsSaga = function*() {
	yield all([
		call(buyXpPlayerActionSaga),
		call(buyCardPlayerActionSaga),
		call(rerollCardsPlayerActionSaga),
		call(toggleShopLockPlayerActionSaga),
		call(sellPiecePlayerActionSaga),
		call(dropPiecePlayerActionSaga),
		call(swapPiecePlayerActionSaga),
		call(spectatePlayerActionSaga),
		call(readyUpPlayerActionSaga),
		call(quickChatPlayerActionSaga)
	]);
};
