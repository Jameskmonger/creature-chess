import { all, takeLatest } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";

import { PlayerSagaContext, PlayerSelectors } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";

export const sendBoardUpdates = function*() {
	const { boardSlice, benchSlice } = yield* getContext<PlayerSagaContext.PlayerBoardSlices>("boardSlices");
	const { outgoing: registry } = yield* getPacketRegistries();

	yield all([
		takeLatest(
			[
				benchSlice.commands.addBoardPieceCommand,
				benchSlice.commands.moveBoardPieceCommand,
				benchSlice.commands.removeBoardPiecesCommand,
				benchSlice.commands.updateBoardPiecesCommand
			],
			function*() {
				const bench = yield* select(PlayerSelectors.getPlayerBench);

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
				const board = yield* select(PlayerSelectors.getPlayerBoard);

				registry.emit(ServerToClient.Game.PacketOpcodes.BOARD_UPDATE, board);
			}
		)
	]);
};
