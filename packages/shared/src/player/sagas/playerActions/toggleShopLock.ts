import { takeEvery, select, put } from "@redux-saga/core/effects";
import { ToggleShopLockAction, TOGGLE_SHOP_LOCK_ACTION } from "../../actions";
import { updateShopLockCommand } from "../../cardShop";
import { isPlayerShopLocked } from "../../playerSelectors";
import { PlayerState } from "../../store";

export const toggleShopLockPlayerActionSagaFactory = <TState extends PlayerState>() => {
  return function*() {
    yield takeEvery<ToggleShopLockAction>(
      TOGGLE_SHOP_LOCK_ACTION,
      function*() {
        const currentLockState: boolean = yield select(isPlayerShopLocked);

        yield put(updateShopLockCommand(!currentLockState));
      }
    );
  };
};
