import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { ServerToClient } from "@creature-chess/networking";
import { GamePhase } from "@creature-chess/models";
import { BoardSlice } from "@creature-chess/board";
import { PlayerInfoCommands } from "@creature-chess/gamemode";

export type GameRoundUpdateEvent = ReturnType<typeof gameRoundUpdateEvent>;
export const gameRoundUpdateEvent = createAction<ServerToClient.Game.PhaseUpdatePacket, "gameRoundUpdateEvent">("gameRoundUpdateEvent");

export const roundUpdateSaga = function*({ boardSlice }: { benchSlice: BoardSlice; boardSlice: BoardSlice }) {
	yield takeLatest<GameRoundUpdateEvent>(
		gameRoundUpdateEvent.toString(),
		function*({ payload: packet }) {
			switch (packet.phase) {
			case GamePhase.PREPARING: {
				yield put(PlayerInfoCommands.updateOpponentCommand(null));
				yield put(boardSlice.commands.unlockBoardCommand());
				return;
			}
			case GamePhase.READY: {
				yield put(boardSlice.commands.lockBoardCommand());
				return;
			}
			default:
				return;
			}
		}
	);
};
