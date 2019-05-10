import { take } from "@redux-saga/core/effects";
import { JOIN_COMPLETE } from "../../actiontypes/localPlayerActionTypes";

export const preventAccidentalClose = function*() {
    yield take(JOIN_COMPLETE);

    // display an "Are you sure you want to leave this page?" dialog
    window.onbeforeunload = () => false;
};
