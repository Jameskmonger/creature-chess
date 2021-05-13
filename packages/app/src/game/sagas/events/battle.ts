import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { defaultGameOptions, GamePhase } from "@creature-chess/models";
import { BoardSlice } from "@creature-chess/board";
import { BattleEvents, battleSagaFactory, startBattle } from "@creature-chess/battle";
import { gameRoundUpdateEvent, GameRoundUpdateEvent } from "./roundUpdate";
import { AppState } from "../../../store";

export const clientBattleSaga = function*(slices: { benchSlice: BoardSlice, boardSlice: BoardSlice }) {
	yield fork(
		battleSagaFactory<AppState>((state: AppState) => state.game.board) as any,
		defaultGameOptions, slices.boardSlice
	);

	yield takeLatest<BattleEvents.BattleTurnEvent>(
		BattleEvents.BATTLE_TURN_EVENT,
		function*({ payload: { board } }: BattleEvents.BattleTurnEvent) {
			yield put(slices.boardSlice.commands.setBoardPiecesCommand({
				pieces: board.pieces,
				piecePositions: board.piecePositions,
				size: undefined // todo improve this
			}));
		}
	);

	yield takeLatest<GameRoundUpdateEvent>(
		gameRoundUpdateEvent.toString(),
		function*({ payload: { phase } }) {
			if (phase === GamePhase.PLAYING) {
				yield put(startBattle());
			}
		}
	);
};
