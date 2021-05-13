import { takeLatest, all, call } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";
import { Socket } from "socket.io";

import { PlayerState, PlayerSagaContext } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";
import { sendGamePhaseUpdates } from "./phases";
import { sendPlayerListUpdates } from "./playerList";
import { sendPlayerInfoUpdates } from "./playerInfoUpdates";
import { sendAnnouncements } from "./announcements";

export const outgoingNetworking = function*() {
	const { boardSlice, benchSlice } = yield* getContext<PlayerSagaContext.PlayerBoardSlices>("boardSlices");
	const { outgoing: registry } = yield* getPacketRegistries();

	const sendBoard = function*() {
		yield all([
			takeLatest(
				[
					benchSlice.commands.addBoardPieceCommand,
					benchSlice.commands.moveBoardPieceCommand,
					benchSlice.commands.removeBoardPiecesCommand,
					benchSlice.commands.updateBoardPiecesCommand
				],
				function*() {
					const bench = yield* select((state: PlayerState) => state.bench);

					registry.emit(ServerToClient.Game.PacketOpcodes.BENCH_UPDATE, bench);
				}
			),
			takeLatest(
				[
					boardSlice.commands.addBoardPieceCommand,
					boardSlice.commands.moveBoardPieceCommand,
					boardSlice.commands.removeBoardPiecesCommand,
					boardSlice.commands.updateBoardPiecesCommand
				],
				function*() {
					const board = yield* select((state: PlayerState) => state.board);

					registry.emit(ServerToClient.Game.PacketOpcodes.BOARD_UPDATE, board);
				}
			)
		]);
	};

	yield all([
		call(sendGamePhaseUpdates),
		call(sendPlayerListUpdates),
		call(sendAnnouncements),
		call(sendPlayerInfoUpdates),
		call(sendBoard)
	]);
};
