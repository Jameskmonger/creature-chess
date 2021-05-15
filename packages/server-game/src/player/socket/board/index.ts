import { getDependency } from "@shoki/engine";
import { all, call, race, take, select } from "typed-redux-saga";
import { PlayerEntity, PlayerEntitySelectors, PlayerGameActions, PlayerSagaContext, PlayerSelectors, PlayerState, PlayerCommands } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { subscribeToBoard } from "./subscribeToBoard";
import { getPacketRegistries, OutgoingRegistry } from "../net/registries";

const getSpectatingPlayer = function*() {
	const spectatingId = yield* select((state: PlayerState) => state.spectating.id);

	if (!spectatingId) {
		return null;
	}

	const game = yield* getDependency<PlayerSagaContext.PlayerSagaDependencies, "game">("game");
	return game.getPlayerById(spectatingId) || null;
};

const spectatePlayerBoard = function*(registry: OutgoingRegistry) {
	const boardSlice = yield* PlayerEntitySelectors.getBoardSlice();
	const benchSlice = yield* PlayerEntitySelectors.getBenchSlice();

	yield all([
		call(
			subscribeToBoard,
			boardSlice,
			PlayerSelectors.getPlayerBoard,
			board => registry.emit(ServerToClient.Game.PacketOpcodes.BOARD_UPDATE, board)
		),
		call(
			subscribeToBoard,
			benchSlice,
			PlayerSelectors.getPlayerBench,
			bench => registry.emit(ServerToClient.Game.PacketOpcodes.BENCH_UPDATE, bench)
		)
	]);
};

const spectateOtherPlayer = function*(player: PlayerEntity) {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield player.runSaga(function*() {
		yield call(spectatePlayerBoard, registry);
	}).toPromise<void>();
};

const spectateLocalPlayer = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();
	yield call(spectatePlayerBoard, registry);
};

/**
 * Watch the local player board and bench, or that of the currently spectated player
 */
export const playerBoard = function*() {
	let spectating = yield* call(getSpectatingPlayer);

	while (true) {
		const { newSpectate }: { newSpectate?: PlayerGameActions.SpectatePlayerAction } = yield* race({
			// todo strongly type this
			newSpectate: take<any>(PlayerCommands.setSpectatingIdCommand.toString()),

			forever:
				spectating
					? call(spectateOtherPlayer, spectating)
					: call(spectateLocalPlayer)
		});

		if (!newSpectate) {
			return;
		}

		spectating = yield* call(getSpectatingPlayer);
	}
};
