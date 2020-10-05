import { take, select, put } from "@redux-saga/core/effects";
import { BUY_CARD, BuyCardAction } from "@creature-chess/shared/player/actions";
import { AppState } from "../../../store/state";
import { Overlay } from "../../../overlay";
import { closeOverlay } from "../../../store/actions/uiActions";

export const closeShopOnFirstBuy = function*() {
    yield take<BuyCardAction>(BUY_CARD);

    const shopIsOpen = yield select((state: AppState) => state.ui.currentOverlay === Overlay.SHOP);

    if (!shopIsOpen) {
        return;
    }

    yield put(closeOverlay());
};
