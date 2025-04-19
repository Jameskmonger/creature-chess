import { take, put } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";

import { PlayerActions } from "@creature-chess/gamemode";

import { AppState } from "../store";
import { closeOverlay } from "../store/game/ui/actions";
import { Overlay } from "../store/game/ui/overlay";

export const closeShopOnFirstBuySaga = function* () {
	yield take(PlayerActions.buyCardPlayerAction.toString());

	const shopIsOpen = yield* select(
		(state: AppState) => state.game.ui.currentOverlay === Overlay.SHOP
	);

	if (!shopIsOpen) {
		return;
	}

	yield put(closeOverlay());
};
