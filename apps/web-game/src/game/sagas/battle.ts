import { takeLatest, put, fork } from "@redux-saga/core/effects";

import {
	BattleCommands,
	BattleEvents,
	battleSaga,
} from "@creature-chess/battle";
import { GameEvents } from "@creature-chess/gamemode";
import { defaultGameOptions, GamePhase } from "@creature-chess/models";

import { AppState } from "../../store";
import { getPlayerSlices } from "../../store/sagaContext";
import { setMatchBoard } from "../module/match";

export const clientBattleSaga = function* () {
	const { board } = yield* getPlayerSlices();

	yield fork(
		battleSaga as any,
		(state: AppState) => state.game.match?.board!,
		defaultGameOptions,
		board
	);

	yield takeLatest<BattleEvents.BattleTurnEvent>(
		BattleEvents.battleTurnEvent,
		function* ({ payload: { board: newBoard } }: BattleEvents.BattleTurnEvent) {
			yield put(setMatchBoard(newBoard));
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
