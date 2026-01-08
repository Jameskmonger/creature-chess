import { PlayerActionTypesArray, quickChatPlayerAction, quitGamePlayerAction, spectatePlayerAction } from "@creature-chess/gamemode/src/playerActions";
import { select, takeEvery } from "typed-redux-saga";
import { metricCollector } from "./metricCollector";

export function* metricCollectorSaga() {
	const IGNORED_ACTIONS = [
		quickChatPlayerAction.toString(),
		quitGamePlayerAction.toString(),
		spectatePlayerAction.toString(),
	];

	const TRACKED_ACTIONS = PlayerActionTypesArray.filter(
		(action) => !IGNORED_ACTIONS.includes(action)
	);

	yield takeEvery(
		TRACKED_ACTIONS,
		function* (action) {
			const s = yield* select();

			metricCollector.recordAction(action, s);
		}
	);
}
