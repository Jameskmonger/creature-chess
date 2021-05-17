import { all, call } from "redux-saga/effects";

import { buyCardPlayerActionSaga } from "./buyCard";
import { buyXpPlayerActionSaga } from "./buyXp";
import { rerollCardsPlayerActionSaga } from "./rerollCards";
import { toggleShopLockPlayerActionSaga } from "./toggleShopLock";
import { sellPiecePlayerActionSaga } from "./sellPiece";
import { dropPiecePlayerActionSaga } from "./dropPiece";
import { spectatePlayerActionSaga } from "./spectate";
import { readyUpPlayerActionSaga } from "./readyUp";

export const playerActionsSaga = function*() {
	yield all([
		call(buyXpPlayerActionSaga),
		call(buyCardPlayerActionSaga),
		call(rerollCardsPlayerActionSaga),
		call(toggleShopLockPlayerActionSaga),
		call(sellPiecePlayerActionSaga),
		call(dropPiecePlayerActionSaga),
		call(spectatePlayerActionSaga),
		call(readyUpPlayerActionSaga)
	]);
};
