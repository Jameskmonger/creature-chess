import { expectSaga } from "redux-saga-test-plan";
import { select } from "redux-saga/effects";
import { toggleShopLock } from "../../actions";
import { updateShopLockCommand } from "../../cardShop";
import { isPlayerShopLocked } from "../../playerSelectors";
import { PlayerState } from "../../store";
import { toggleShopLockPlayerActionSagaFactory } from "./toggleShopLock";

describe("toggleShopLockPlayerActionSagaFactory", () => {
    const saga = toggleShopLockPlayerActionSagaFactory<PlayerState>();

    test("should toggle lock state", () => {
        return expectSaga(saga)
            .provide([
                [select(isPlayerShopLocked), false]
            ])
            .put(updateShopLockCommand(true))
            .dispatch(toggleShopLock())
            .silentRun();
    });
});
