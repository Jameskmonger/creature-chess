import { all, takeEvery } from "redux-saga/effects";
import { updateVariables } from "@shoki/engine";
import { playerRunReadyPhaseEvent, PlayerRunReadyPhaseEvent } from "../../../game/events";
import { PlayerVariables } from "../playerVariables";
import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../../../entities/player/events";

export const updateMatchVariable = function*() {
	yield all([
		takeEvery<PlayerRunReadyPhaseEvent>(
			playerRunReadyPhaseEvent.toString(),
			function*({ payload: { match } }) {
				yield* updateVariables<PlayerVariables>({ match });
			}
		),
		takeEvery<PlayerFinishMatchEvent>(
			playerFinishMatchEvent.toString(),
			function*() {
				yield* updateVariables<PlayerVariables>({ match: null });
			}
		)
	]);
};
