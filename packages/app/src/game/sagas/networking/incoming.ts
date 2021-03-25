import { takeEvery, put, fork } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import {
    BenchCommands, BoardCommands, ConnectionStatus, GameEvents, IncomingPacketRegistry,
    PlayerInfoCommands, ServerToClientPacketAcknowledgements, ServerToClientPacketDefinitions, ServerToClientPacketOpcodes, startBattle,
    PlayerEvents
} from "@creature-chess/shared";
import { GamePhase } from "@creature-chess/models";
import { playerListUpdated } from "../../features/playerList/playerListActions";
import { clearSelectedPiece } from "../../features/board/actions";
import { clearAnnouncement, closeOverlay, finishGameAction, openOverlay, playersResurrected, updateConnectionStatus } from "../../../ui/actions";
import { Overlay } from "../../../ui/overlay";

type ServerToClientPacketRegistry = IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;

const readPacketsToActions = function*(registry: ServerToClientPacketRegistry, socket: SocketIOClient.Socket) {
    const channel = eventChannel<any>(emit => {
        socket.on("reconnect_failed", () => {
            emit(clearAnnouncement());
            emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
        });
        socket.on("reconnect_error", () => {
            emit(clearAnnouncement());
            emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED));
        });

        registry.on(
            ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE,
            (packet) => {
                emit(playerListUpdated(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.CARDS_UPDATE,
            (packet) => {
                emit(PlayerInfoCommands.updateCardsCommand(packet));
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
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE,
            (packet) => {
                emit(PlayerInfoCommands.updateShopLockCommand(packet.locked));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.PLAYERS_RESURRECTED,
            ({ playerIds }) => {
                emit(playersResurrected(playerIds));
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

                        emit(BoardCommands.initialiseBoard(board.pieces));
                        emit(BenchCommands.initialiseBenchCommand(bench));
                        emit(PlayerInfoCommands.updateCardsCommand(cards));
                        emit(PlayerInfoCommands.clearOpponentCommand());
                        emit(BoardCommands.unlockBoard());
                        emit(openOverlay(Overlay.SHOP));
                        emit(clearAnnouncement());
                        return;
                    }
                    case GamePhase.READY: {
                        const { board, bench, opponentId } = packet.payload;

                        if (board) {
                            emit(BoardCommands.initialiseBoard(board.pieces));
                        }

                        emit(BenchCommands.initialiseBenchCommand(bench));
                        emit(BoardCommands.lockBoard());
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

export const incomingGameNetworking = function*(socket: SocketIOClient.Socket) {
    const registry = new IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    yield fork(readPacketsToActions, registry, socket);
};
