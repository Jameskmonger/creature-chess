import { takeLatest, take, fork, all, delay } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";
import { Socket } from "socket.io";

import { PlayerState, PlayerInfoCommands, PlayerCommands, GameEvents, PlayerEvents, PlayerGameActions, PlayerSagaContext } from "@creature-chess/gamemode";
import { ServerToClient, OutgoingPacketRegistry } from "@creature-chess/networking";
import { GamePhase } from "@creature-chess/models";

import { NewPlayerSocketEvent, NEW_PLAYER_SOCKET_EVENT } from "../events";

type OutgoingRegistry = OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>;

export const outgoingNetworking = function*() {
	const playerId = yield* getContext<string>("playerId");
	const { getLogger, getMatch } = yield* getContext<PlayerSagaContext.PlayerSagaDependencies>("dependencies");
	const { boardSlice, benchSlice } = yield* getContext<PlayerSagaContext.PlayerBoardSlices>("boardSlices");

	let registry: OutgoingRegistry;
	let socket: Socket;

	const sendGamePhaseUpdates = function*() {
		yield takeLatest<GameEvents.GamePhaseStartedEvent>(
			GameEvents.gamePhaseStartedEvent.toString(),
			function*({ payload: { phase, startedAt, round } }) {
				if (phase === GamePhase.PREPARING) {
					const board = yield* select((state: PlayerState) => state.board);
					const bench = yield* select((state: PlayerState) => state.bench);
					const cards = yield* select((state: PlayerState) => state.cardShop.cards);

					const packet: ServerToClient.Game.PhaseUpdatePacket = {
						startedAtSeconds: startedAt,
						phase: GamePhase.PREPARING,
						payload: {
							round: round!,
							pieces: {
								board,
								bench
							},
							cards
						}
					};

					registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
				} else if (phase === GamePhase.READY) {
					const bench = yield* select((state: PlayerState) => state.bench);
					const health = yield* select((state: PlayerState) => state.playerInfo.health);

					const match = getMatch();

					if (!match) {
						if (health > 0) {
							getLogger().warn("No match found for living player when entering ready state");
						}

						return;
					}

					const board = match.getBoardForPlayer(playerId);

					const opponentId =
						match.home.id === playerId
							? match.away.id
							: match.home.id;

					const packet: ServerToClient.Game.PhaseUpdatePacket = {
						startedAtSeconds: startedAt,
						phase: GamePhase.READY,
						payload: {
							bench,
							board,
							opponentId
						}
					};

					registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
				} else if (phase === GamePhase.PLAYING) {
					const packet: ServerToClient.Game.PhaseUpdatePacket = { startedAtSeconds: startedAt, phase: GamePhase.PLAYING };

					registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
				}
			}
		);
	};

	const sendAnnouncements = function*() {
		yield all([
			takeLatest<PlayerEvents.PlayerDeathEvent>(
				PlayerEvents.playerDeathEvent.toString(),
				function*() {
					registry.emit(ServerToClient.Game.PacketOpcodes.PLAYER_DEAD, { empty: true });
				}
			),
			takeLatest<PlayerEvents.PlayerMatchRewardsEvent>(
				PlayerEvents.PLAYER_MATCH_REWARDS_EVENT,
				function*({ payload }: PlayerEvents.PlayerMatchRewardsEvent) {
					registry.emit(ServerToClient.Game.PacketOpcodes.MATCH_REWARDS, payload);
				}
			),
			takeLatest<GameEvents.GameFinishEvent>(
				GameEvents.gameFinishEvent.toString(),
				function*({ payload: { winnerId } }) {
					registry.emit(ServerToClient.Game.PacketOpcodes.FINISH_GAME, { winnerId });
				}
			)
		]);
	};

	const sendPlayerListUpdates = function*() {
		yield takeLatest<GameEvents.PlayerListChangedEvent>(
			GameEvents.playerListChangedEvent.toString(),
			function*({ payload: { players } }) {
				registry.emit(ServerToClient.Game.PacketOpcodes.PLAYER_LIST_UPDATE, players);
			}
		);
	};

	const sendCommands = function*() {
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
			),

			takeLatest(
				PlayerCommands.updateCardsCommand,
				function*() {
					const cards = yield* select((state: PlayerState) => state.cardShop.cards);

					registry.emit(ServerToClient.Game.PacketOpcodes.CARDS_UPDATE, cards);
				}
			),
			takeLatest(
				PlayerCommands.updateShopLockCommand,
				function*() {
					const locked = yield* select((state: PlayerState) => state.cardShop.locked);

					registry.emit(ServerToClient.Game.PacketOpcodes.SHOP_LOCK_UPDATE, locked);
				}
			),
			takeLatest<PlayerInfoCommands.UpdateMoneyCommand>(
				PlayerInfoCommands.UPDATE_MONEY_COMMAND,
				function*() {
					const money = yield* select((state: PlayerState) => state.playerInfo.money);

					registry.emit(ServerToClient.Game.PacketOpcodes.MONEY_UPDATE, money);
				}
			),
			takeLatest<PlayerInfoCommands.UpdateLevelCommand>(
				PlayerInfoCommands.UPDATE_LEVEL_COMMAND,
				function*() {
					const level = yield* select((state: PlayerState) => state.playerInfo.level);
					const xp = yield* select((state: PlayerState) => state.playerInfo.xp);

					registry.emit(ServerToClient.Game.PacketOpcodes.LEVEL_UPDATE, { level, xp });
				}
			),
			takeLatest<PlayerInfoCommands.UpdateHealthCommand>(
				PlayerInfoCommands.UPDATE_HEALTH_COMMAND,
				function*() {
					const health = yield* select((state: PlayerState) => state.playerInfo.health);

					registry.emit(ServerToClient.Game.PacketOpcodes.HEALTH_UPDATE, health);
				}
			)
		]);
	};

	yield takeLatest<NewPlayerSocketEvent>(
		NEW_PLAYER_SOCKET_EVENT,
		function*({ payload: { socket: newSocket } }) {
			socket = newSocket;

			registry = new OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>(
				(opcode, payload, ack) => socket.emit(opcode, payload, ack)
			);

			yield fork(sendCommands);
			yield fork(sendGamePhaseUpdates);
			yield fork(sendAnnouncements);
			yield fork(sendPlayerListUpdates);
		}
	);

	yield take<PlayerGameActions.QuitGamePlayerAction | GameEvents.GameFinishEvent>([
		PlayerGameActions.quitGamePlayerAction.toString(),
		GameEvents.gameFinishEvent.toString()
	]);
	yield delay(100);

	socket!.removeAllListeners();
	socket!.disconnect();
	(socket! as unknown as null) = null;
	(registry! as unknown as null) = null;
};
