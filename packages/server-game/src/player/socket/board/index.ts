import { all, call, race } from "typed-redux-saga";
import { PlayerEntitySelectors, PlayerSelectors } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { spectateBoard } from "./spectateBoard";

type Slices = { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> };

export const playerBoard = function*() {
	const boardSlice = yield* PlayerEntitySelectors.getBoardSlice();
	const benchSlice = yield* PlayerEntitySelectors.getBenchSlice();

	let spectatingSlices: Slices | null = null;

	while (true) {
		const target = spectatingSlices || { boardSlice, benchSlice };

		yield race({
			// newSpectate: take SPECTATE,
			forever: all([
				call(spectateBoard, target.boardSlice, PlayerSelectors.getPlayerBoard, ServerToClient.Game.PacketOpcodes.BOARD_UPDATE),
				call(spectateBoard, target.benchSlice, PlayerSelectors.getPlayerBench, ServerToClient.Game.PacketOpcodes.BENCH_UPDATE)
			])
		});
	}
};
