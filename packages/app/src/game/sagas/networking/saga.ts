import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all, select } from "@redux-saga/core/effects";
import { playerListUpdated } from "../../features/playerList/playerListActions";
import { log } from "../../../log";
import { AppState } from "../../../store/state";
import { signIn } from "../../../auth/auth0";
import {
    BoardCommands,
    PlayerActions, PlayerInfoCommands, BenchCommands,
    BATTLE_FINISH_EVENT, startBattle,

    validateNickname,
    IncomingPacketRegistry, OutgoingPacketRegistry, ConnectionStatus,
    ServerToClientPacketDefinitions, ServerToClientPacketOpcodes, ServerToClientPacketAcknowledgements, AuthenticateResponse,
    ClientToServerPacketDefinitions, ClientToServerPacketOpcodes, ClientToServerPacketAcknowledgements, SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS,
    ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketOpcodes, ServerToClientLobbyPacketAcknowledgements, GameEvents
} from "@creature-chess/shared";
import { AuthSelectors } from "../../../auth";
import {
    clearAnnouncement, closeOverlay, FindGameAction, FIND_GAME, openOverlay,
    updateConnectionStatus, finishGameAction, playersResurrected
} from "../../../ui/actions";
import { joinLobbyAction, updateLobbyPlayerAction } from "../../../lobby/store/actions";
import { GamePhase } from "@creature-chess/models";
import { Overlay } from "../../../ui/overlay";
import { clearSelectedPiece } from "../../features/board/actions";

type Socket = SocketIOClient.Socket;

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;
type ServerToClientPacketRegistry = IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;

const subscribe = (
    registry: ServerToClientPacketRegistry,
    socket: Socket
) => {
    return eventChannel(emit => {
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
                log("[PLAYER_LIST_UPDATE]", packet);
                emit(playerListUpdated(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.CARDS_UPDATE,
            (packet) => {
                log("[CARDS_UPDATE]", packet);
                emit(PlayerInfoCommands.updateCardsCommand(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.MONEY_UPDATE,
            (packet) => {
                log("[MONEY_UPDATE]", packet);
                emit(PlayerInfoCommands.updateMoneyCommand(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.PHASE_UPDATE,
            (packet) => {
                log("[PHASE_UPDATE]", packet);

                emit(GameEvents.gamePhaseStartedEvent(packet.phase, packet.startedAtSeconds));

                switch (packet.phase) {
                    case GamePhase.PREPARING: {
                        const { cards, pieces: { board, bench } } = packet.payload;

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

        registry.on(
            ServerToClientPacketOpcodes.LEVEL_UPDATE,
            (packet) => {
                log("[LEVEL_UPDATE]", packet);

                emit(PlayerInfoCommands.updateLevelCommand(packet.level, packet.xp));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.JOIN_GAME,
            ({ fullState }) => {
                const { money, cards, players, level: { level, xp }, board, bench, phase } = fullState;

                emit(PlayerInfoCommands.updateMoneyCommand(money));
                emit(PlayerInfoCommands.updateCardsCommand(cards));
                emit(playerListUpdated(players));
                emit(PlayerInfoCommands.updateLevelCommand(level, xp));
                emit(BoardCommands.initialiseBoard(board));
                emit(BenchCommands.initialiseBenchCommand(bench));

                if (phase) {
                    emit(GameEvents.gamePhaseStartedEvent(phase.phase, phase.startedAtSeconds));
                } else {
                    emit(updateConnectionStatus(ConnectionStatus.RECONNECTED));
                }
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.FINISH_GAME,
            (packet) => {
                log("[FINISH_GAME]", packet);

                emit(finishGameAction(packet.winnerName));

                socket.close();
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE,
            (packet) => {
                log("[SHOP_LOCK_UPDATE]", packet);

                emit(PlayerInfoCommands.updateShopLockCommand(packet.locked));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.PLAYERS_RESURRECTED,
            ({ playerIds }) => {
                emit(playersResurrected(playerIds));
            }
        );

        // tslint:disable-next-line:no-empty
        return () => { };
    });
};

const readPacketsToActions = function*(incomingRegistry: ServerToClientPacketRegistry, socket: Socket) {
    const channel = yield call(subscribe, incomingRegistry, socket);

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });
};

const sendPlayerActions = function*(registry: ClientToServerPacketRegsitry) {
    let transmissionInProgress = false;
    let actionPacketIndex = 0;
    let pendingActions: PlayerActions.PlayerAction[] = [];

    const emitPendingActions = () => {
        // if there's a transmission in progress then wait
        if (transmissionInProgress) {
            return;
        }

        if (pendingActions.length === 0) {
            return;
        }

        transmissionInProgress = true;
        const index = ++actionPacketIndex;
        const actions = [...pendingActions];
        pendingActions = [];

        let timeout: number;

        const sendPacket = () => {
            registry.emit(
                ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS,
                { index, actions },
                (accepted, packetIndex) => {
                    // if packet was not accepted, let's finish here
                    if (!accepted) {
                        return;
                    }

                    // if indices don't match, something weird must have happened.
                    // stop here for safety, but it shouldn't happen
                    if (packetIndex !== index) {
                        return;
                    }

                    // if the action just acknowledged isn't the most recent action, then stop -
                    // we must have already processed this acknowledgement in another flow
                    if (actionPacketIndex !== index) {
                        return;
                    }

                    // close the transmission
                    transmissionInProgress = false;
                    clearTimeout(timeout);

                    // emit any pending actions queued while this was being sent
                    emitPendingActions();
                }
            );

            timeout = setTimeout(sendPacket, SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS) as unknown as number;
        };

        sendPacket();
    };

    const queueAction = (action: PlayerActions.PlayerAction) => {
        pendingActions.push(action);

        emitPendingActions();
    };

    yield takeEvery<PlayerActions.PlayerAction>(
        PlayerActions.PlayerActionTypesArray,
        function*(action) {
            queueAction(action);
        }
    );
};

const writeActionsToPackets = function*(registry: ClientToServerPacketRegsitry) {
    yield all([
        takeEvery(
            BATTLE_FINISH_EVENT,
            function*() {
                registry.emit(ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
            }
        ),
        yield fork(sendPlayerActions, registry)
    ]);
};

export const networking = function*() {
    // const action: FindGameAction = yield take(FIND_GAME);

    // const state: AppState = yield select();

    // // this should never happen, but it doesn't hurt to be safe
    // if (!AuthSelectors.isLoggedIn(state)) {
    //     signIn();

    //     return;
    // }

    // const idToken = AuthSelectors.getIdToken(state);

    // let socket: Socket = null;

    // while (socket === null) {
    //     try {
    //         socket = yield call(getSocket, action.payload.serverIP, idToken);
    //     } catch (e) {
    //         // todo improve this, currently it just refreshes if there's an error.
    //         signIn();

    //         return;
    //     }
    // }

    // const outgoingRegistry = new OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
    //     (opcode, payload, ack) => socket.emit(opcode, payload, ack)
    // );

    // const incomingRegistry = new IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
    //     (opcode, handler) => socket.on(opcode, handler)
    // );

    // yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

    // yield fork(readPacketsToActions, incomingRegistry, socket);
    // yield fork(writeActionsToPackets, outgoingRegistry);
};
