
import { take, select, put } from "@redux-saga/core/effects";
import { PlayerGameActions } from "@creature-chess/gamemode";
import { AppState } from "../../../store/state";
import { Overlay } from "../../ui/overlay";
import { closeOverlay } from "../../ui/actions";

export const closeShopOnFirstBuy = function*() {
    yield take(PlayerGameActions.buyCardPlayerAction.toString());

    const shopIsOpen = yield select((state: AppState) => state.game.ui.currentOverlay === Overlay.SHOP);

    if (!shopIsOpen) {
        return;
    }

    yield put(closeOverlay());
};
