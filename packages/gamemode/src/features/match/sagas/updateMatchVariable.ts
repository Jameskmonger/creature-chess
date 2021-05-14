import { all, takeEvery } from "redux-saga/effects";
import { playerFinishMatchEvent, PlayerFinishMatchEvent, playerRunReadyPhaseEvent, PlayerRunReadyPhaseEvent } from "../../../game/events";
import { updatePlayerVariables } from "../../../player/variablesStore";
import { PlayerVariables } from "../playerVariables";

export const updateMatchVariable = function*() {
	yield all([
		takeEvery<PlayerRunReadyPhaseEvent>(
			playerRunReadyPhaseEvent.toString(),
			function*({ payload: { match } }) {
				yield* updatePlayerVariables<PlayerVariables>({ match });
			}
		),
		takeEvery<PlayerFinishMatchEvent>(
			playerFinishMatchEvent.toString(),
			function*() {
				yield* updatePlayerVariables<PlayerVariables>({ match: null });
			}
		)
	]);
};
