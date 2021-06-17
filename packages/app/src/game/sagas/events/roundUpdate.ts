import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { ServerToClient } from "@creature-chess/networking";
import { GamePhase } from "@creature-chess/models";
import { PlayerCommands } from "@creature-chess/gamemode";
import { getPlayerSlices } from "../../../store/sagaContext";

export type GameRoundUpdateEvent = ReturnType<typeof gameRoundUpdateEvent>;
export const gameRoundUpdateEvent = createAction<ServerToClient.Game.PhaseUpdatePacket, "gameRoundUpdateEvent">("gameRoundUpdateEvent");

export const roundUpdateSaga = function*() {
	const { board } = yield* getPlayerSlices();

	yield takeLatest<GameRoundUpdateEvent>(
		gameRoundUpdateEvent.toString(),
		function*({ payload: packet }) {
			switch (packet.phase) {
				case GamePhase.PREPARING: {
					yield put(PlayerCommands.updateOpponentCommand(null));
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
