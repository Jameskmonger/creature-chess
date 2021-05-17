import { Socket } from "socket.io-client";
import { eventChannel } from "redux-saga";
import { takeEvery, put, call, all } from "redux-saga/effects";
import { PlayerEvents, RoundInfoCommands, PlayerCommands } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { receiveActionsSaga } from "@shoki/networking";
import { BoardSlice } from "@shoki/board";
import { GamePhase } from "@creature-chess/models";
import { startBattle } from "@creature-chess/battle";

import { setWinnerIdCommand, updateConnectionStatus } from "../../../game/ui/actions";
import { PlayerListCommands } from "../../../game/module";
import { ConnectionStatus } from "../../../game/connection-status";
import { gameRoundUpdateEvent } from "../../../game/sagas/events";
import { setMatchBoard } from "../../../game/module/match";

const readPacketsToActions = function*(
	registry: ServerToClient.Game.IncomingRegistry,
	socket: Socket,
	{ benchSlice, boardSlice }: { benchSlice: BoardSlice; boardSlice: BoardSlice }
) {
	const channel = eventChannel<any>(emit => {
		socket.on("reconnect_failed", () => {
			emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
		});
		socket.on("reconnect_error", () => {
			emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
		});

		registry.on(
			ServerToClient.Game.PacketOpcodes.PLAYER_LIST_UPDATE,
			(packet) => {
				emit(PlayerListCommands.updatePlayerListCommand(packet));
			}
		);

		registry.on(
			ServerToClient.Game.PacketOpcodes.MATCH_BOARD_UPDATE,
			({ board, turn }) => {
				emit(setMatchBoard(board));

				if (turn) {
					emit(startBattle(turn));
				}
			}
		);

		registry.on(
			ServerToClient.Game.PacketOpcodes.BOARD_UPDATE,
			(newValue) => {
				emit(boardSlice.commands.setBoardPiecesCommand(newValue));
			}
		);

		registry.on(
			ServerToClient.Game.PacketOpcodes.BENCH_UPDATE,
			(newValue) => {
				emit(benchSlice.commands.setBoardPiecesCommand(newValue));
			}
		);

		registry.on(
			ServerToClient.Game.PacketOpcodes.MATCH_REWARDS,
			(payload) => {
				emit(PlayerEvents.playerMatchRewardsEvent(payload));
			}
		);

		registry.on(
			ServerToClient.Game.PacketOpcodes.FINISH_GAME,
			({ winnerId }) => {
				emit(setWinnerIdCommand({ winnerId }));

				socket.close();
			}
		);

		registry.on(
			ServerToClient.Game.PacketOpcodes.PHASE_UPDATE,
			(packet) => {
				const update = {
					phase: packet.phase,
					startedAt: packet.startedAtSeconds,
					...(packet.phase === GamePhase.PREPARING ? { round: packet.payload.round } : undefined)
				};

				emit(RoundInfoCommands.setRoundInfoCommand(update));
				emit(gameRoundUpdateEvent(packet));
			}
		);

		// todo registry off here
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => { };
	});

	yield takeEvery(channel, function*(action) {
		yield put(action);
	});
};

export const incomingGameNetworking = function*(
	socket: Socket,
	slices: { benchSlice: BoardSlice; boardSlice: BoardSlice }
) {
	// todo fix typing
	const registry = ServerToClient.Game.createIncomingRegistry((opcode, handler) => socket.on(opcode, handler as any));

	yield all([
		call(readPacketsToActions, registry, socket, slices),
		call(receiveActionsSaga, registry, [
			PlayerCommands.setSpectatingIdCommand.toString(),
			PlayerCommands.updateCardsCommand.toString(),
			PlayerCommands.updateShopLockCommand.toString(),
			PlayerCommands.updateMoneyCommand.toString(),
			PlayerCommands.updateLevelCommand.toString(),
			PlayerCommands.updateHealthCommand.toString(),
			PlayerCommands.updateOpponentCommand.toString()
		]),
	]);
};
