import { takeLatest } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";
import { ClientFinishMatchEvent, CLIENT_FINISH_MATCH_EVENT } from "../../../player/events";
import { getMatch } from "../selectors";

export const clientFinishMatch = function*() {
	const playerId = yield* getContext<string>("playerId");
	const playerName = yield* getContext<string>("playerName");

	yield takeLatest<ClientFinishMatchEvent>(
		CLIENT_FINISH_MATCH_EVENT,
		function*() {
			const match = yield* getMatch();

			if (!match) {
				console.log("no match found for " + playerName);
				return;
			}

			match?.onClientFinishMatch(playerId);
		}
	);
};
