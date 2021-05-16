import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { ServerToClient } from "@creature-chess/networking";
import { GamePhase } from "@creature-chess/models";
import { BoardSlice } from "@creature-chess/board";
import { PlayerCommands, PlayerInfoCommands } from "@creature-chess/gamemode";

export type GameRoundUpdateEvent = ReturnType<typeof gameRoundUpdateEvent>;
export const gameRoundUpdateEvent = createAction<ServerToClient.Game.PhaseUpdatePacket, "gameRoundUpdateEvent">("gameRoundUpdateEvent");

export const roundUpdateSaga = function*({ benchSlice, boardSlice }: { benchSlice: BoardSlice, boardSlice: BoardSlice }) {
	yield takeLatest<GameRoundUpdateEvent>(
		gameRoundUpdateEvent.toString(),
		function*({ payload: packet }) {
			switch (packet.phase) {
				case GamePhase.PREPARING: {
					const { cards } = packet.payload;

					yield put(PlayerCommands.updateCardsCommand(cards));
					yield put(PlayerInfoCommands.clearOpponentCommand());
					yield put(boardSlice.commands.unlockBoardCommand());
					return;
				}
				case GamePhase.READY: {
					const { opponentId } = packet.payload;

					yield put(boardSlice.commands.lockBoardCommand());
					yield put(PlayerInfoCommands.updateOpponentCommand(opponentId));
					return;
				}
				default:
					return;
			}
		}
	);
};
