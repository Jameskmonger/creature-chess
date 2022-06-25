import { takeLatest, put, fork } from "@redux-saga/core/effects";

import {
	BattleEvents,
	battleSagaFactory,
	startBattle,
} from "@creature-chess/battle";
import { GameEvents } from "@creature-chess/gamemode";
import { defaultGameOptions, GamePhase } from "@creature-chess/models";

import { AppState } from "../../store";
import { getPlayerSlices } from "../../store/sagaContext";
import { setMatchBoard } from "../module/match";

export const clientBattleSaga = function* () {
	const { board } = yield* getPlayerSlices();

	yield fork(
		battleSagaFactory<AppState>((state) => state.game.match?.board!) as any,
		defaultGameOptions,
		board
	);

	yield takeLatest<BattleEvents.BattleTurnEvent>(
		BattleEvents.BATTLE_TURN_EVENT,
		function* ({ payload: { board: newBoard } }: BattleEvents.BattleTurnEvent) {
			yield put(setMatchBoard(newBoard));
		}
	);

	yield takeLatest<GameEvents.GamePhaseStartedEvent>(
		GameEvents.gamePhaseStartedEvent.toString(),
		function* ({ payload: { phase } }) {
			if (phase === GamePhase.PLAYING) {
				yield put(startBattle());
			}

			if (phase === GamePhase.PREPARING) {
				yield put(setMatchBoard(null));
			}
		}
	);
};
