import { takeLatest, put } from "@redux-saga/core/effects";

import {
	GameEvents,
	PlayerCommands,
	RoundInfoCommands,
} from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { getPlayerSlices } from "../../store/sagaContext";

export const roundUpdateSaga = function* () {
	const { board } = yield* getPlayerSlices();

	yield takeLatest<GameEvents.GamePhaseStartedEvent>(
		GameEvents.gamePhaseStartedEvent.toString(),
		function* ({ payload: packet }) {
			const update = {
				phase: packet.phase,
				startedAt: packet.startedAt,
				...(packet.phase === GamePhase.PREPARING
					? { round: packet.round }
					: undefined),
			};

			yield put(RoundInfoCommands.setRoundInfoCommand(update));

			switch (packet.phase) {
				case GamePhase.PREPARING: {
					yield put(
						PlayerCommands.playerInfoCommands.updateOpponentCommand({
							id: null,
						})
					);
					yield put(board.commands.unlockBoardCommand());
					return;
				}
				case GamePhase.READY: {
					yield put(board.commands.lockBoardCommand());
					return;
				}
				default:
					return;
			}
		}
	);
};
