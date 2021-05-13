import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { ServerToClient } from "@creature-chess/networking";
import { GamePhase } from "@creature-chess/models";
import { BoardSlice } from "@creature-chess/board";
import { PlayerCommands, PlayerInfoCommands } from "@creature-chess/gamemode";
import { startBattle } from "@creature-chess/battle";

export type GameRoundUpdateEvent = ReturnType<typeof gameRoundUpdateEvent>;
export const gameRoundUpdateEvent = createAction<ServerToClient.Game.PhaseUpdatePacket, "gameRoundUpdateEvent">("gameRoundUpdateEvent");

export const roundUpdateSaga = function*({ benchSlice, boardSlice }: { benchSlice: BoardSlice, boardSlice: BoardSlice }) {
	yield takeLatest<GameRoundUpdateEvent>(
		gameRoundUpdateEvent.toString(),
		function*({ payload: packet }) {
			switch (packet.phase) {
				case GamePhase.PREPARING: {
					const { cards, pieces: { board, bench }, round } = packet.payload;

					yield put(boardSlice.commands.setBoardPiecesCommand(board));
					yield put(benchSlice.commands.setBoardPiecesCommand(bench));
					yield put(PlayerCommands.updateCardsCommand(cards));
					yield put(PlayerInfoCommands.clearOpponentCommand());
					yield put(boardSlice.commands.unlockBoardCommand());
					return;
				}
				case GamePhase.READY: {
					const { board, bench, opponentId } = packet.payload;

					if (board) {
						yield put(boardSlice.commands.setBoardPiecesCommand(board));
					}

					yield put(benchSlice.commands.setBoardPiecesCommand(bench));
					yield put(boardSlice.commands.lockBoardCommand());
					yield put(PlayerInfoCommands.updateOpponentCommand(opponentId));
					return;
				}
				case GamePhase.PLAYING: {
					yield put(startBattle());
					return;
				}
				default:
					return;
			}
		}
	);
};
