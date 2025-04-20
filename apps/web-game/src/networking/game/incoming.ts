import { eventChannel } from "redux-saga";
import { takeEvery, put, call, all } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { setMatchBoard } from "~/store/game/match/state";
import { updateConnectionStatus } from "~/store/game/ui/actions";
import { getPlayerSlices } from "~/store/sagaContext";

import { BoardSlice } from "@shoki/board";
import { ActionStream, IncomingRegistry } from "@shoki/networking";

import { BattleCommands } from "@creature-chess/battle";
import {
	PlayerEvents,
	PlayerCommands,
	GameEvents,
} from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { GameServerToClient } from "@creature-chess/networking";

import { ConnectionStatus } from "../connection-status";

const readPacketsToActions = function* (
	registry: IncomingRegistry<GameServerToClient.PacketSet>,
	socket: Socket,
	boardSlice: BoardSlice<PieceModel>,
	benchSlice: BoardSlice<PieceModel>
) {
	const channel = eventChannel<any>((emit) => {
		socket.on("reconnect_failed", () => {
			emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
		});
		socket.on("reconnect_error", () => {
			emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
		});

		registry.on("matchBoardUpdate", ({ board, turn }) => {
			emit(setMatchBoard(board));

			if (turn) {
				emit(BattleCommands.startBattleCommand({ turn }));
			}
		});

		registry.on("boardUpdate", (newValue) => {
			emit(boardSlice.commands.setBoardPiecesCommand(newValue));
		});

		registry.on("benchUpdate", (newValue) => {
			emit(benchSlice.commands.setBoardPiecesCommand(newValue));
		});

		// todo registry off here
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => {};
	});

	yield takeEvery(channel, function* (action) {
		yield put(action);
	});
};

export const incomingGameServerToClient = function* (socket: Socket) {
	const { board, bench } = yield* getPlayerSlices();

	// todo fix typing
	const registry = GameServerToClient.incoming(
		(opcode, handler) => socket.on(opcode, handler as any),
		(opcode, handler) => socket.off(opcode, handler as any)
	);

	yield all([
		call(readPacketsToActions, registry, socket, board, bench),

		call(
			ActionStream.incomingSaga<GameServerToClient.PacketSet, "sendGameEvents">(
				registry,
				"sendGameEvents",
				GameEvents.GameEventActionTypesArray
			)
		),

		call(
			ActionStream.incomingSaga<
				GameServerToClient.PacketSet,
				"sendLocalPlayerEvents"
			>(
				registry,
				"sendLocalPlayerEvents",
				PlayerEvents.PlayerEventActionTypesArray
			)
		),

		call(
			ActionStream.incomingSaga<
				GameServerToClient.PacketSet,
				"playerInfoUpdates"
			>(
				registry,
				"playerInfoUpdates",
				PlayerCommands.PlayerInfoUpdateCommandActionTypesArray
			)
		),
	]);
};
