import { take } from "@redux-saga/core/effects";
import { PlayerActions } from "@creature-chess/gamemode";

export const preventAccidentalClose = function*() {
	// display an "Are you sure you want to leave this page?" dialog
	window.onbeforeunload = () => "Are you sure you want to leave this page? There is currently no way to rejoin a game";

	yield take(PlayerActions.quitGamePlayerAction.toString());

	// just to allow the packets to send
	setTimeout(() => {
		window.onbeforeunload = null;
		window.location.href = "https://creaturechess.com";
	}, 100);
};
