import { takeEvery, put, fork } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { PlayerInfoCommands, PlayerEvents, PlayerCommands, RoundInfoCommands } from "@creature-chess/gamemode";
import { IncomingPacketRegistry, ServerToClient } from "@creature-chess/networking";
import { BoardSlice } from "@creature-chess/board";
import { GamePhase } from "@creature-chess/models";

import { setWinnerIdCommand, updateConnectionStatus } from "../../../game/ui/actions";
import { PlayerListCommands } from "../../../game/module";
import { ConnectionStatus } from "../../../game/connection-status";
import { gameRoundUpdateEvent } from "../../../game/sagas/events";

type ServerToClientPacketRegistry = IncomingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>;

const readPacketsToActions = function*(
    registry: ServerToClientPacketRegistry,
    socket: SocketIOClient.Socket,
    { benchSlice, boardSlice }: { benchSlice: BoardSlice, boardSlice: BoardSlice }
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
            ServerToClient.Game.PacketOpcodes.BOARD_UPDATE,
            ({ state }) => {
                emit(boardSlice.commands.setBoardPiecesCommand(state));
            }
        );

        registry.on(
            ServerToClient.Game.PacketOpcodes.BENCH_UPDATE,
            ({ state }) => {
                emit(benchSlice.commands.setBoardPiecesCommand(state));
            }
        );

        registry.on(
            ServerToClient.Game.PacketOpcodes.CARDS_UPDATE,
            (packet) => {
                emit(PlayerCommands.updateCardsCommand(packet));
            }
        );

        registry.on(
            ServerToClient.Game.PacketOpcodes.SHOP_LOCK_UPDATE,
            (packet) => {
                emit(PlayerCommands.updateShopLockCommand(packet.locked));
            }
        );

        registry.on(
            ServerToClient.Game.PacketOpcodes.MONEY_UPDATE,
            (packet) => {
                emit(PlayerInfoCommands.updateMoneyCommand(packet));
            }
        );

        registry.on(
            ServerToClient.Game.PacketOpcodes.HEALTH_UPDATE,
            (packet) => {
                emit(PlayerInfoCommands.updateHealthCommand(packet));
            }
        );

        registry.on(
            ServerToClient.Game.PacketOpcodes.LEVEL_UPDATE,
            (packet) => {
                emit(PlayerInfoCommands.updateLevelCommand(packet.level, packet.xp));
                emit(boardSlice.commands.setPieceLimitCommand(packet.level));
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
        // tslint:disable-next-line:no-empty
        return () => { };
    });

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });
};

export const incomingGameNetworking = function*(
    socket: SocketIOClient.Socket,
    slices: { benchSlice: BoardSlice, boardSlice: BoardSlice }
) {
    const registry = new IncomingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    yield fork(readPacketsToActions, registry, socket, slices);
};
