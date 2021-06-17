import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { defaultGameOptions, GamePhase } from "@creature-chess/models";
import { BattleEvents, battleSagaFactory, startBattle } from "@creature-chess/battle";
import { gameRoundUpdateEvent, GameRoundUpdateEvent } from "./roundUpdate";
import { AppState } from "../../../store";
import { setMatchBoard } from "../../module/match";
import { getPlayerSlices } from "../../../store/sagaContext";

export const clientBattleSaga = function*() {
	const { board } = yield* getPlayerSlices();

	yield fork(
		battleSagaFactory<AppState>((state: AppState) => state.game.match?.board) as any,
		defaultGameOptions, board
	);

	yield takeLatest<BattleEvents.BattleTurnEvent>(
		BattleEvents.BATTLE_TURN_EVENT,
		function*({ payload: { board: newBoard } }: BattleEvents.BattleTurnEvent) {
			yield put(setMatchBoard(newBoard));
		}
	);

	yield takeLatest<GameRoundUpdateEvent>(
		gameRoundUpdateEvent.toString(),
		function*({ payload: { phase } }) {
			if (phase === GamePhase.PLAYING) {
				yield put(startBattle());
			}

			if (phase === GamePhase.PREPARING) {
				yield put(setMatchBoard(null));
			}
		}
	);
};
