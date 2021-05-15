import { takeEvery, select, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { updateShopLockCommand } from "../../../../player/cardShop";
import { isPlayerShopLocked } from "../../../../player/playerSelectors";

export type ToggleShopLockPlayerAction = ReturnType<typeof toggleShopLockPlayerAction>;
export const toggleShopLockPlayerAction = createAction("toggleShopLockPlayerAction");

export const toggleShopLockPlayerActionSaga = function*() {
	yield takeEvery<ToggleShopLockPlayerAction>(
		toggleShopLockPlayerAction.toString(),
		function*() {
			const currentLockState: boolean = yield select(isPlayerShopLocked);

			yield put(updateShopLockCommand(!currentLockState));
		}
	);
};
