import { takeLatest } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";
import { ClientFinishMatchEvent, clientFinishMatchEvent } from "../../../entities/player/events";
import { getMatch } from "../selectors";

export const clientFinishMatch = function*() {
	const playerId = yield* getContext<string>("id");

	yield takeLatest<ClientFinishMatchEvent>(
		clientFinishMatchEvent.toString(),
		function*() {
			const match = yield* getMatch();

			match?.onClientFinishMatch(playerId);
		}
	);
};
