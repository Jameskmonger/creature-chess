import { expectSaga } from "redux-saga-test-plan";
import { select } from "redux-saga/effects";
import { updateShopLockCommand } from "../cardShop";
import { isPlayerShopLocked } from "../playerSelectors";
import { toggleShopLockPlayerAction, toggleShopLockPlayerActionSaga } from "./toggleShopLock";

describe("toggleShopLockPlayerActionSagaFactory", () => {
	test("should toggle lock state", () => {
		return expectSaga(toggleShopLockPlayerActionSaga)
			.provide([
				[select(isPlayerShopLocked), false]
			])
			.put(updateShopLockCommand(true))
			.dispatch(toggleShopLockPlayerAction())
			.silentRun();
	});
});
