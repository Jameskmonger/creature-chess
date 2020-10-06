import { take, select, put } from "@redux-saga/core/effects";
import { BUY_CARD, BuyCardAction } from "@creature-chess/shared/player/actions";
import { AppState } from "../../../store/state";
import { Overlay } from "../../../ui/overlay";
import { closeOverlay } from "../../../ui/actions";

export const closeShopOnFirstBuy = function*() {
    yield take<BuyCardAction>(BUY_CARD);

    const shopIsOpen = yield select((state: AppState) => state.ui.currentOverlay === Overlay.SHOP);

    if (!shopIsOpen) {
        return;
    }

    yield put(closeOverlay());
};