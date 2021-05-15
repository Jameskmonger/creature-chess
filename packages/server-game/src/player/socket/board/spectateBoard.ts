import { select, takeLatest } from "typed-redux-saga";
import { BoardSlice, BoardState } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { PlayerState } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../net/registries";

export const spectateBoard = function*(
	slice: BoardSlice<PieceModel>,
	selector: (state: PlayerState) => BoardState<PieceModel>,
	opcode: ServerToClient.Game.PacketOpcodes.BOARD_UPDATE | ServerToClient.Game.PacketOpcodes.BENCH_UPDATE
) {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield takeLatest(
		[
			slice.commands.addBoardPieceCommand,
			slice.commands.moveBoardPieceCommand,
			slice.commands.removeBoardPiecesCommand,
			slice.commands.updateBoardPiecesCommand
		],
		function*() {
			const state = yield* select(selector);

			registry.emit(opcode, state);
		}
	)
};
