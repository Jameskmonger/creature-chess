import { delay, take } from "@redux-saga/core/effects";

import { GameEvents } from "@creature-chess/gamemode";

import { APP_BASE_URL } from "@creature-chess-app/web-game/src/constants";

export const goToMenuAfterGame = function* () {
	yield take<GameEvents.GameFinishEvent>(GameEvents.gameFinishEvent.toString());

	yield delay(10_000);

	window.location.href = APP_BASE_URL;
};
