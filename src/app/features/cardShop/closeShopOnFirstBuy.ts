import { take, select, put } from "@redux-saga/core/effects";
import { BUY_CARD, BuyCardAction } from "@common/player/actions";
import { AppState } from "@app/store/state";
import { Overlay } from "@app/overlay";
import { closeOverlay } from "@app/store/actions/uiActions";

export const closeShopOnFirstBuy = function*() {
    yield take<BuyCardAction>(BUY_CARD);

    const shopIsOpen = yield select((state: AppState) => state.ui.currentOverlay === Overlay.SHOP);

    if (!shopIsOpen) {
        return;
    }

    yield put(closeOverlay());
};
