import { takeEvery, put, fork } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import {
    GameEvents,
    PlayerInfoCommands,
    PlayerEvents, PlayerCommands
} from "@creature-chess/gamemode";
import { IncomingPacketRegistry, ServerToClient } from "@creature-chess/networking";

import { startBattle } from "@creature-chess/battle";
import { BoardSlice } from "@creature-chess/board";
import { GamePhase } from "@creature-chess/models";
import { closeOverlay, finishGameAction, openOverlay, updateConnectionStatus, clearSelectedPiece } from "../../../ui/actions";
import { Overlay } from "../../../ui/overlay";
import { PlayerListCommands } from "../../../game/features";
import { ConnectionStatus } from "../../connection-status";

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
            (packet) => {
                emit(finishGameAction(packet.winnerName));

                socket.close();
            }
        );

        registry.on(
            ServerToClient.Game.PacketOpcodes.PHASE_UPDATE,
            (packet) => {
                // todo this is ugly
                if (packet.phase === GamePhase.PREPARING) {
                    emit(GameEvents.gamePhaseStartedEvent(packet.phase, packet.startedAtSeconds, packet.payload.round));
                } else {
                    emit(GameEvents.gamePhaseStartedEvent(packet.phase, packet.startedAtSeconds));
                }

                switch (packet.phase) {
                    case GamePhase.PREPARING: {
                        const { cards, pieces: { board, bench }, round } = packet.payload;

                        emit(GameEvents.gamePhaseStartedEvent(packet.phase, packet.startedAtSeconds, round));

                        emit(boardSlice.commands.setBoardPiecesCommand(board));
                        emit(benchSlice.commands.setBoardPiecesCommand(bench));
                        emit(PlayerCommands.updateCardsCommand(cards));
                        emit(PlayerInfoCommands.clearOpponentCommand());
                        emit(boardSlice.commands.unlockBoardCommand());
                        emit(openOverlay(Overlay.SHOP));
                        return;
                    }
                    case GamePhase.READY: {
                        const { board, bench, opponentId } = packet.payload;

                        if (board) {
                            emit(boardSlice.commands.setBoardPiecesCommand(board));
                        }

                        emit(benchSlice.commands.setBoardPiecesCommand(bench));
                        emit(boardSlice.commands.lockBoardCommand());
                        emit(closeOverlay());
                        emit(PlayerInfoCommands.updateOpponentCommand(opponentId));
                        emit(clearSelectedPiece());
                        return;
                    }
                    case GamePhase.PLAYING: {
                        emit(startBattle());
                        return;
                    }
                    default:
                        return;
                }
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
