import { eventChannel } from "redux-saga";
import { takeEvery, put, call, all } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { updateConnectionStatus } from "~/store/game/ui/actions";
import { getPlayerSlices } from "~/store/sagaContext";

import { ActionStream, IncomingRegistry } from "@shoki/networking";

import { BattleCommands } from "@creature-chess/battle";
import {
	PlayerEvents,
	PlayerCommands,
	GameEvents,
} from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

import { ConnectionStatus } from "../connection-status";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

function updateBoardFromPacket(
	board: Board,
	pieceRegistry: PieceRegistry,
	packet: GameServerToClient.BoardUpdatePacket
) {
	board.clear();
	board.setPieces(
		Object.entries(packet.positions).map(([position, pieceId]) => {
			const [x, y] = position.split(",").map(Number);

			return { id: pieceId, x, y };
		})
	);

	for (const piece of packet.pieces) {
		pieceRegistry.registerPiece(piece);
	}
}

const readPacketsToActions = function*(
	registry: IncomingRegistry<GameServerToClient.PacketSet>,
	socket: Socket,
	pieceRegistry: PieceRegistry,
	board: Board,
	bench: Board,
	matchBoard: Board,
) {
	const channel = eventChannel<any>((emit) => {
		socket.on("reconnect_failed", () => {
			emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
		});
		socket.on("reconnect_error", () => {
			emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
		});

		registry.on("matchBoardUpdate", (packet) => {
			console.log("Received match board update", packet);
			updateBoardFromPacket(matchBoard, pieceRegistry, packet.board);

			if (packet.turn) {
				emit(BattleCommands.startBattleCommand({ turn: packet.turn }));
			}
		});

		registry.on("boardUpdate", (newValue) => {
			console.log("Received board update", newValue);
			updateBoardFromPacket(board, pieceRegistry, newValue);
		});

		registry.on("benchUpdate", (newValue) => {
			console.log("Received bench update", newValue);
			updateBoardFromPacket(bench, pieceRegistry, newValue);
		});

		// todo registry off here
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => { };
	});

	yield takeEvery(channel, function*(action) {
		yield put(action);
	});
};

export const incomingGameServerToClient = function*(socket: Socket) {
	const { board, bench, matchBoard, pieceRegistry } = yield* getPlayerSlices();

	// todo fix typing
	const registry = GameServerToClient.incoming(
		(opcode, handler) => socket.on(opcode, handler as any),
		(opcode, handler) => socket.off(opcode, handler as any)
	);

	yield all([
		call(readPacketsToActions, registry, socket, pieceRegistry, board, bench, matchBoard),

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
