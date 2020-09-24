import { QUIT_GAME } from "@creature-chess/shared/player/actions";
import { take } from "@redux-saga/core/effects";
import { JOIN_COMPLETE } from "../../actiontypes/localPlayerActionTypes";

export const preventAccidentalClose = function*() {
    yield take(JOIN_COMPLETE);

    // display an "Are you sure you want to leave this page?" dialog
    window.onbeforeunload = () => "Are you sure you want to leave this page? There is currently no way to rejoin a game";

    yield take(QUIT_GAME);

    // just to allow the packets to send
    setTimeout(() => {
        window.onbeforeunload = undefined;
        location.reload();
    }, 100);
};
