import { getDependency } from "@shoki/engine";
import { all, call, race, SagaGenerator, take } from "typed-redux-saga";
import { PlayerEntity, PlayerEntitySelectors, PlayerGameActions, PlayerSagaContext, PlayerSelectors } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { spectateBoard } from "./spectateBoard";

type Slices = { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> };

export const getSlice = function*(
	player: PlayerEntity,
	selector: (typeof PlayerEntitySelectors.getBoardSlice | typeof PlayerEntitySelectors.getBenchSlice)
) {
	const result: BoardSlice<PieceModel> = yield player.runSaga(function*() {
		return yield* selector();
	}).toPromise<BoardSlice<PieceModel>>();

	return result;
};

export const playerBoard = function*() {
	const boardSlice = yield* PlayerEntitySelectors.getBoardSlice();
	const benchSlice = yield* PlayerEntitySelectors.getBenchSlice();

	let spectatingSlices: Slices | null = null;

	while (true) {
		const target = spectatingSlices || { boardSlice, benchSlice };

		const { newSpectate, forever } = yield* race({
			newSpectate: take<PlayerGameActions.SpectatePlayerAction>(PlayerGameActions.spectatePlayerAction.toString()),
			// newSpectate: take SPECTATE,
			forever: all([
				call(spectateBoard, target.boardSlice, PlayerSelectors.getPlayerBoard, ServerToClient.Game.PacketOpcodes.BOARD_UPDATE),
				call(spectateBoard, target.benchSlice, PlayerSelectors.getPlayerBench, ServerToClient.Game.PacketOpcodes.BENCH_UPDATE)
			])
		});

		if (!newSpectate || !newSpectate.payload.playerId) {
			spectatingSlices = null;
			return;
		}

		const game = yield* getDependency<PlayerSagaContext.PlayerSagaDependencies, "game">("game");
		const other = game.getPlayerById(newSpectate.payload.playerId);

		if (!other) {
			spectatingSlices = null;
			return;
		}

		spectatingSlices = {
			boardSlice: yield getSlice(other, PlayerEntitySelectors.getBoardSlice),
			benchSlice: yield getSlice(other, PlayerEntitySelectors.getBenchSlice)
		};
	}
};
