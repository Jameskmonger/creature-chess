import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all, select } from "@redux-saga/core/effects";
import { playerListUpdated } from "../../features/playerList/playerListActions";
import { log } from "../../../log";
import { BATTLE_FINISHED } from "@creature-chess/shared/match/combat/battleEventChannel";
import { AppState } from "../../../store/state";
import { IncomingPacketRegistry } from "@creature-chess/shared/networking/incoming-packet-registry";
import {
    ServerToClientPacketDefinitions, ServerToClientPacketOpcodes, ServerToClientPacketAcknowledgements, AuthenticateResponse, PreparingPhaseUpdatePacket
} from "@creature-chess/shared/networking/server-to-client";
import {
    ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketOpcodes, ServerToClientLobbyPacketAcknowledgements
} from "@creature-chess/shared/networking/server-to-client-lobby";
import { OutgoingPacketRegistry } from "@creature-chess/shared/networking/outgoing-packet-registry";
import { ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements, ClientToServerPacketOpcodes, SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS } from "@creature-chess/shared/networking/client-to-server";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { PlayerActionTypesArray, PlayerAction } from "@creature-chess/shared/player/actions";
import { signIn } from "../../../auth/auth0";
import { validateNickname } from "@creature-chess/shared/validation/nickname";
import { cardsUpdated, clearOpponent, moneyUpdateAction, setLevelAction, setOpponent, shopLockUpdated } from "@creature-chess/shared/player/playerInfo";
import { initialiseBoard, lockBoard, unlockBoard } from "@creature-chess/shared/board/actions/boardActions";
import { initialiseBench } from "@creature-chess/shared/player/bench/benchActions";
import { AuthSelectors } from "../../../auth";
import { clearAnnouncement, closeOverlay, FindGameAction, FIND_GAME, joinCompleteAction, openOverlay, updateConnectionStatus } from "../../../ui/actions";
import { joinLobbyAction, NicknameChosenAction, NICKNAME_CHOSEN, requestNickname, updateLobbyPlayerAction } from "../../../lobby/store/actions";
import { finishGameAction, gamePhaseStarted, playersResurrected } from "@creature-chess/shared/game/store/actions";
import { GamePhase } from "@creature-chess/models";
import { Overlay } from "packages/app/src/ui/overlay";
import { clearSelectedPiece } from "../../features/board/actions";
import { startBattle } from "@creature-chess/shared/match/combat/battleSaga";

type Socket = SocketIOClient.Socket;

const getSocket = (serverIP: string, idToken: string, nickname?: string) => {
    // force to websocket for now until CORS is sorted
    const socket = io(
        serverIP,
        {
            transports: ["websocket", "xhr-polling"],
            reconnectionAttempts: 15,
            reconnectionDelay: 100,
            reconnectionDelayMax: 1000
        }
    );

    return new Promise<Socket>((resolve, reject) => {
        socket.on("connect", () => {
            socket.emit("authenticate", { idToken, nickname });
        });

        const onAuthenticated = ({ error }: AuthenticateResponse) => {
            if (!error) {
                socket.off("authenticate_response", onAuthenticated);

                resolve(socket);

                return;
            }

            socket.disconnect();
            reject(error);
        };

        socket.on("authenticate_response", onAuthenticated);
    });
};

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;
type ServerToClientPacketRegistry = IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;
type ServerToClientLobbyPacketRegistry = IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>;

const subscribe = (
    registry: ServerToClientPacketRegistry,
    lobbyRegistry: ServerToClientLobbyPacketRegistry,
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
                emit(cardsUpdated(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.MONEY_UPDATE,
            (packet) => {
                log("[MONEY_UPDATE]", packet);
                emit(moneyUpdateAction(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.PHASE_UPDATE,
            (packet) => {
                log("[PHASE_UPDATE]", packet);

                emit(updateConnectionStatus(ConnectionStatus.CONNECTED));
                emit(gamePhaseStarted(packet.phase, packet.startedAtSeconds));

                switch (packet.phase) {
                    case GamePhase.PREPARING: {
                        const { cards, pieces: { board, bench } } = packet.payload;

                        emit(initialiseBoard(board.pieces));
                        emit(initialiseBench(bench));
                        emit(cardsUpdated(cards));
                        emit(unlockBoard());
                        emit(openOverlay(Overlay.SHOP));
                        emit(clearOpponent());
                        emit(clearAnnouncement());
                        return;
                    }
                    case GamePhase.READY: {
                        const { board, bench, opponentId } = packet.payload;

                        if (board) {
                            emit(initialiseBoard(board.pieces));
                        }

                        emit(initialiseBench(bench));
                        emit(lockBoard());
                        emit(closeOverlay());
                        emit(setOpponent(opponentId));
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

                emit(setLevelAction(packet.level, packet.xp));
            }
        );

        // todo split lobby networking
        lobbyRegistry.on(
            ServerToClientLobbyPacketOpcodes.JOIN_LOBBY,
            ({ playerId, lobbyId, players, startTimestamp }) => {
                emit(joinLobbyAction(
                    playerId,
                    lobbyId,
                    players,
                    startTimestamp
                ));
            }
        );

        lobbyRegistry.on(
            ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE,
            ({ index, player }) => {
                emit(updateLobbyPlayerAction(index, player));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.JOIN_GAME,
            ({ id, fullState }) => {
                emit(joinCompleteAction(id));

                if (!fullState) {
                    return;
                }

                const { money, cards, players, level: { level, xp }, board, bench, phase } = fullState;

                emit(moneyUpdateAction(money));
                emit(cardsUpdated(cards));
                emit(playerListUpdated(players));
                emit(setLevelAction(level, xp));
                emit(initialiseBoard(board));
                emit(initialiseBench(bench));

                if (phase) {
                    emit(gamePhaseStarted(phase.phase, phase.startedAtSeconds));
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

                emit(shopLockUpdated(packet.locked));
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

const readPacketsToActions = function*(incomingRegistry: ServerToClientPacketRegistry, lobbyRegistry: ServerToClientLobbyPacketRegistry, socket: Socket) {
    const channel = yield call(subscribe, incomingRegistry, lobbyRegistry, socket);

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });
};

const sendPlayerActions = function*(registry: ClientToServerPacketRegsitry) {
    let transmissionInProgress = false;
    let actionPacketIndex = 0;
    let pendingActions: PlayerAction[] = [];

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

    const queueAction = (action: PlayerAction) => {
        pendingActions.push(action);

        emitPendingActions();
    };

    yield takeEvery<PlayerAction>(
        PlayerActionTypesArray,
        function*(action) {
            queueAction(action);
        }
    );
};

const writeActionsToPackets = function*(registry: ClientToServerPacketRegsitry) {
    yield all([
        takeEvery(
            BATTLE_FINISHED,
            function*() {
                registry.emit(ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
            }
        ),
        yield fork(sendPlayerActions, registry)
    ]);
};

export const networking = function*() {
    const action: FindGameAction = yield take(FIND_GAME);

    const state: AppState = yield select();

    // this should never happen, but it doesn't hurt to be safe
    if (!AuthSelectors.isLoggedIn(state)) {
        signIn();

        return;
    }

    const idToken = AuthSelectors.getIdToken(state);

    let socket: Socket = null;
    let chosenNickname: string = null;

    while (socket === null) {
        try {
            socket = yield call(getSocket, action.payload.serverIP, idToken, chosenNickname);
        } catch (e) {
            // todo abstract this- the duplication isnt nice
            if (e.type === "nickname_required") {
                chosenNickname = null;
                yield put(requestNickname("You must choose a unique nickname before you can play!"));

                while (chosenNickname === null) {
                    const { payload: { nickname } }: NicknameChosenAction = yield take<NicknameChosenAction>(NICKNAME_CHOSEN);

                    const error = validateNickname(nickname);

                    if (error) {
                        yield put(requestNickname(error));
                    } else {
                        // this stops the loop
                        chosenNickname = nickname;
                    }
                }
            } else if (e.type === "invalid_nickname") {
                chosenNickname = null;

                yield put(requestNickname(`Error: ${e.error}`));

                while (chosenNickname === null) {
                    const { payload: { nickname } }: NicknameChosenAction = yield take<NicknameChosenAction>(NICKNAME_CHOSEN);

                    const error = validateNickname(nickname);

                    if (error) {
                        yield put(requestNickname(error));
                    } else {
                        // this stops the loop
                        chosenNickname = nickname;
                    }
                }
            } else {
                signIn();

                return;
            }
        }
    }

    const outgoingRegistry = new OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
        (opcode, payload, ack) => socket.emit(opcode, payload, ack)
    );

    const incomingRegistry = new IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    const lobbyRegistry = new IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

    yield fork(readPacketsToActions, incomingRegistry, lobbyRegistry, socket);
    yield fork(writeActionsToPackets, outgoingRegistry);
};