import { take } from "@redux-saga/core/effects";
import { PlayerGameActions } from "@creature-chess/gamemode";

export const preventAccidentalClose = function*() {
    // display an "Are you sure you want to leave this page?" dialog
    window.onbeforeunload = () => "Are you sure you want to leave this page? There is currently no way to rejoin a game";

    yield take(PlayerGameActions.quitGamePlayerAction.toString());

    // just to allow the packets to send
    setTimeout(() => {
        window.onbeforeunload = undefined;
        location.reload();
    }, 100);
};
