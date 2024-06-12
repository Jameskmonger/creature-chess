import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";

import {
	BattleCommands,
	BattleEvents,
	battleSaga,
} from "@creature-chess/battle";
import { GameEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { AppState } from "../../store";
import { getPlayerSlices } from "../../store/sagaContext";
import { setMatchBoard } from "../module/match";
import { setStats } from "../module/stats";

export const clientBattleSaga = function* () {
	const settings = yield* select((state: AppState) => state.game.settings);
	const { board } = yield* getPlayerSlices();

	yield fork(
		battleSaga,
		(state: AppState) => state.game.match?.board!,
		settings,
		board
	);

	yield takeLatest<BattleEvents.BattleTurnEvent>(
		BattleEvents.battleTurnEvent,
		function* ({ payload: { board: newBoard } }: BattleEvents.BattleTurnEvent) {
			yield put(setMatchBoard(newBoard));
			yield put(setStats(newBoard));
		}
	);

	yield takeLatest<GameEvents.GamePhaseStartedEvent>(
		GameEvents.gamePhaseStartedEvent.toString(),
		function* ({ payload: { phase } }) {
			if (phase === GamePhase.PLAYING) {
				yield put(BattleCommands.startBattleCommand({}));
			}

			if (phase === GamePhase.PREPARING) {
				yield put(setMatchBoard(null));
			}
		}
	);
};
