
import { take, select, put } from "@redux-saga/core/effects";
import { PlayerActions } from "@creature-chess/gamemode";
import { AppState } from "../../../store";
import { Overlay } from "../../ui/overlay";
import { closeOverlay } from "../../ui/actions";

export const closeShopOnFirstBuySaga = function*() {
	yield take(PlayerActions.buyCardPlayerAction.toString());

	const shopIsOpen = yield select((state: AppState) => state.game.ui.currentOverlay === Overlay.SHOP);

	if (!shopIsOpen) {
		return;
	}

	yield put(closeOverlay());
};
