import { take } from "@redux-saga/core/effects";
import { PlayerActions } from "@creature-chess/shared";

export const preventAccidentalClose = function*() {
    // display an "Are you sure you want to leave this page?" dialog
    window.onbeforeunload = () => "Are you sure you want to leave this page? There is currently no way to rejoin a game";

    yield take(PlayerActions.QUIT_GAME_ACTION);

    // just to allow the packets to send
    setTimeout(() => {
        window.onbeforeunload = undefined;
        location.reload();
    }, 100);
};
