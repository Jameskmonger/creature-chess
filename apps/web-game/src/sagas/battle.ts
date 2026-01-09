import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";
import { AppState } from "~/store";
import { getPlayerSlices } from "~/store/sagaContext";

import {
	BattleCommands,
	battleSaga,
} from "@creature-chess/battle";
import { GameEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

export const clientBattleSaga = function*() {
	const settings = yield* select((state: AppState) => state.game.settings);
	const { matchBoard, pieceRegistry } = yield* getPlayerSlices();

	yield fork(
		battleSaga,
		settings,
		matchBoard,
		pieceRegistry,
	);

	yield takeLatest<GameEvents.GamePhaseStartedEvent>(
		GameEvents.gamePhaseStartedEvent.toString(),
		function*({ payload: { phase } }) {
			if (phase === GamePhase.PLAYING) {
				yield put(BattleCommands.startBattleCommand({}));
			}

			if (phase === GamePhase.PREPARING) {
				matchBoard.clear();
			}
		}
	);
};
