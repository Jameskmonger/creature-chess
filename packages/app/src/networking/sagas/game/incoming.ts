import { takeEvery, put, fork } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import {
    ConnectionStatus, GameEvents, IncomingPacketRegistry,
    PlayerInfoCommands, ServerToClientPacketAcknowledgements, ServerToClientPacketDefinitions, ServerToClientPacketOpcodes,
    PlayerEvents, PlayerCommands
} from "@creature-chess/shared";

import { startBattle } from "@creature-chess/battle";
import { BoardSlice } from "@creature-chess/board";
import { GamePhase } from "@creature-chess/models";
import { closeOverlay, finishGameAction, openOverlay, updateConnectionStatus, clearSelectedPiece } from "../../../ui/actions";
import { Overlay } from "../../../ui/overlay";
import { playerListUpdated } from "../../../game/features/playerList/playerListActions";

type ServerToClientPacketRegistry = IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;

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
            ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE,
            (packet) => {
                emit(playerListUpdated(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.BOARD_UPDATE,
            ({ state }) => {
                emit(boardSlice.commands.setBoardPiecesCommand(state));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.BENCH_UPDATE,
            ({ state }) => {
                emit(benchSlice.commands.setBoardPiecesCommand(state));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.CARDS_UPDATE,
            (packet) => {
                emit(PlayerCommands.updateCardsCommand(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE,
            (packet) => {
                emit(PlayerCommands.updateShopLockCommand(packet.locked));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.MONEY_UPDATE,
            (packet) => {
                emit(PlayerInfoCommands.updateMoneyCommand(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.LEVEL_UPDATE,
            (packet) => {
                emit(PlayerInfoCommands.updateLevelCommand(packet.level, packet.xp));
                emit(boardSlice.commands.setPieceLimitCommand(packet.level));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.MATCH_REWARDS,
            (payload) => {
                emit(PlayerEvents.playerMatchRewardsEvent(payload));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.FINISH_GAME,
            (packet) => {
                emit(finishGameAction(packet.winnerName));

                socket.close();
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.PHASE_UPDATE,
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
    const registry = new IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    yield fork(readPacketsToActions, registry, socket, slices);
};
