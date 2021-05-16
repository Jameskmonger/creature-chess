import { getDependency, getVariable } from "@shoki/engine";
import { all, call, race, take, select, delay, getContext } from "typed-redux-saga";
import {
	PlayerVariables, PlayerEntity, PlayerEntitySelectors, PlayerGameActions,
	PlayerSagaContext, PlayerSelectors, PlayerState, PlayerCommands, GameEvents, Match
} from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries, OutgoingRegistry } from "../net/registries";
import { subscribeToBoard } from "./subscribeToBoard";
import { Task } from "redux-saga";

const getSpectatingPlayer = function*() {
	const spectatingId = yield* select((state: PlayerState) => state.spectating.id);

	if (!spectatingId) {
		return null;
	}

	const game = yield* getDependency<PlayerSagaContext.PlayerSagaDependencies, "game">("game");
	return game.getPlayerById(spectatingId) || null;
};

const getMatch = () => getVariable<PlayerVariables, Match | null>(variables => variables.match);

const spectatePlayerBoard = function*(registry: OutgoingRegistry) {
	const playerId = yield* getContext<string>("id");
	const boardSlice = yield* PlayerEntitySelectors.getBoardSlice();
	const benchSlice = yield* PlayerEntitySelectors.getBenchSlice();

	const initialMatch = yield* getMatch();

	if (initialMatch) {
		registry.emit(
			ServerToClient.Game.PacketOpcodes.MATCH_BOARD_UPDATE,
			{
				turn: initialMatch.getTurn(),
				board: initialMatch.getBoardForPlayer(playerId)
			}
		);

		// todo send opponentId
	}

	yield all([
		call(function*() {
			while (true) {
				yield take(GameEvents.playerRunReadyPhaseEvent.toString());

				// todo improve this, it's to allow the match variable to be set... maybe some `setMatchEvent`
				yield delay(100);

				const match = yield* getMatch();

				if (match) {
					registry.emit(
						ServerToClient.Game.PacketOpcodes.MATCH_BOARD_UPDATE,
						{
							turn: null,
							board: match.getBoardForPlayer(playerId)
						}
					);
				}

				yield take(GameEvents.playerFinishMatchEvent.toString());
			}
		}),
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

	let task: Task | null = null;
	try {
		task = player.runSaga(function*() {
			yield call(spectatePlayerBoard, registry);
		});

		yield task.toPromise<void>();
	} finally {
		task?.cancel();
	}
};

const spectateLocalPlayer = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();
	yield call(spectatePlayerBoard, registry);
};

/**
 * Watch the local player board and bench, or that of the currently spectated player
 */
export const playerBoard = function*() {
	yield delay(200); // todo (#418) remove the need for this

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
