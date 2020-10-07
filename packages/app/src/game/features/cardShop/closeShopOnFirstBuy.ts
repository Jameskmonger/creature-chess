import { take, select, put } from "@redux-saga/core/effects";
import { PlayerActions } from "@creature-chess/shared";
import { AppState } from "../../../store/state";
import { Overlay } from "../../../ui/overlay";
import { closeOverlay } from "../../../ui/actions";

export const closeShopOnFirstBuy = function*() {
    yield take<PlayerActions.BuyCardAction>(PlayerActions.BUY_CARD_ACTION);

    const shopIsOpen = yield select((state: AppState) => state.ui.currentOverlay === Overlay.SHOP);

    if (!shopIsOpen) {
        return;
    }

    yield put(closeOverlay());
};
