import { createAction } from "@reduxjs/toolkit";
import { takeEvery, call, all } from "redux-saga/effects";
import { take } from "typed-redux-saga";

import { BattleEvents } from "@creature-chess/battle";
import { PlayerActions } from "@creature-chess/gamemode";

import { getGameConnectionRef } from "~/networking/connectionRef";

import { clientBattleSaga } from "./battle";
import { clickPieceSaga } from "./board/clickPieceSaga";
import { clickTileSaga } from "./board/clickTileSaga";
import { handleQuickChat } from "./chat/quickChat";
import { closeShopOnFirstBuySaga } from "./closeShopOnFirstBuySaga";
import { preventAccidentalClose } from "./preventAccidentalClose";
import { uiSaga } from "./ui";

export const gameStartedAction = createAction("gameStarted");

function* battleBridgeSaga() {
	yield takeEvery(
		BattleEvents.battleFinishEvent.toString(),
		function* () {
			const gameConnection = getGameConnectionRef();
			gameConnection?.sendFinishMatch();
		},
	);
}

function* boardActionBridgeSaga() {
	yield takeEvery(
		[
			PlayerActions.dropPiecePlayerAction.toString(),
			PlayerActions.swapPiecePlayerAction.toString(),
		],
		function* (action: any) {
			const gameConnection = getGameConnectionRef();
			gameConnection?.sendPlayerAction(action);
		},
	);
}

export function* gameEntryPointSaga() {
	while (true) {
		yield* take(gameStartedAction.toString());

		yield all([
			call(preventAccidentalClose),
			call(closeShopOnFirstBuySaga),
			call(clickTileSaga),
			call(clickPieceSaga),
			call(clientBattleSaga),
			call(uiSaga),
			call(handleQuickChat),
			call(battleBridgeSaga),
			call(boardActionBridgeSaga),
		]);
	}
}
