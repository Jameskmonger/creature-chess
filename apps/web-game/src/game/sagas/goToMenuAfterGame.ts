import { delay, take } from "@redux-saga/core/effects";
import { GameEvents } from "@creature-chess/gamemode";

export const goToMenuAfterGame = function*() {
	yield take<GameEvents.GameFinishEvent>(GameEvents.gameFinishEvent.toString());

	yield delay(10_000);

	window.location.href = "https://creaturechess.com";
};
