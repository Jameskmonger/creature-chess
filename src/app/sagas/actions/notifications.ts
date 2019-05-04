import { take, takeEvery } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import { GAME_STATE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GameState, Constants } from "../../../shared";
import { ActionWithPayload } from "../types";

const getStateMessage = (state: GameState) => {
    if (state === GameState.PLAYING) {
        return "Playing!";
    }

    const stateLength = Constants.STATE_LENGTHS[state];

    return `${GameState[state]}, ${stateLength} seconds`;
};

export const notifications = function*() {
    yield takeEvery<ActionWithPayload<{ state: GameState }>>(GAME_STATE_UPDATE, action => {
        const message = getStateMessage(action.payload.state);

        toast(message, {
            autoClose: 2500,
            draggable: false,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            hideProgressBar: true
        });
    });
};
