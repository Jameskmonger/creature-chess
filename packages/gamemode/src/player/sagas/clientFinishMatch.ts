import { takeLatest } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";
import { ClientFinishMatchEvent, CLIENT_FINISH_MATCH_EVENT } from "../events";
import { PlayerSagaDependencies } from "../sagaContext";

export const clientFinishMatch = function*() {
    const { getMatch } = yield* getContext<PlayerSagaDependencies>("dependencies");

    yield takeLatest<ClientFinishMatchEvent>(
        CLIENT_FINISH_MATCH_EVENT,
        function*() {
            const match = getMatch();

            if (match === null) {
                return;
            }

            match.onClientFinishMatch();
        }
    );
};
