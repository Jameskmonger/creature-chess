import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all, takeLatest, select } from "@redux-saga/core/effects";
import { Socket, ActionWithPayload } from "../store/sagas/types";
import {
    moneyUpdateAction, gamePhaseUpdate, CreateGameAction, JoinGameAction, joinGameError,
    FindGameAction, shopLockUpdated, updateConnectionStatus, clearAnnouncement, finishGameAction, playersResurrected
} from "../store/actions/gameActions";
import { playerListUpdated } from "../features/playerList/playerListActions";
import { cardsUpdated } from "../features/cardShop/cardActions";
import { FIND_GAME, JOIN_GAME, CREATE_GAME, UPDATE_CONNECTION_STATUS } from "../store/actiontypes/gameActionTypes";
import { log } from "../log";
import { joinCompleteAction, localPlayerLevelUpdate, updateReconnectSecret } from "../store/actions/localPlayerActions";
import { newFeedMessage } from "../features/feed/feedActions";
import { SEND_CHAT_MESSAGE } from "../features/chat/chatActionTypes";
import { BATTLE_FINISHED } from "@common/match/combat/battleEventChannel";
import { joinLobbyAction, updateLobbyPlayerAction } from "../store/actions/lobbyActions";
import { START_LOBBY_GAME } from "../store/actiontypes/lobbyActionTypes";
import { AppState } from "../store/state";
import { IncomingPacketRegistry } from "@common/networking/incoming-packet-registry";
import { ServerToClientPacketDefinitions, ServerToClientPacketOpcodes, JoinLobbyResponse, ServerToClientPacketAcknowledgements } from "@common/networking/server-to-client";
import { OutgoingPacketRegistry } from "@common/networking/outgoing-packet-registry";
import { ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements, ClientToServerPacketOpcodes, SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS } from "@common/networking/client-to-server";
import { ConnectionStatus } from "@common/networking";
import { PlayerActionTypesArray, PlayerAction } from "@common/player/actions";
import { signIn } from "@app/auth/auth0";

const getSocket = (serverIP: string, idToken: string) => {
    // force to websocket for now until CORS is sorted
    const socket = io(serverIP, { transports: ["websocket", "xhr-polling"] });

    return new Promise<Socket>((resolve, reject) => {
        socket.on("connect", () => {
            socket.emit("authenticate", { idToken });
        });

        const onAuthenticated = ({ success }: { success: boolean }) => {
            if (success) {
                socket.off("authenticate_response", onAuthenticated);

                resolve(socket);

                return;
            }

            socket.disconnect();
            reject();
        };

        socket.on("authenticate_response", onAuthenticated);
    });
};

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;
type ServerToClientPacketRegistry = IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;

const findGame = (registry: ClientToServerPacketRegsitry, name: string) => {
    return new Promise<JoinLobbyResponse>(resolve => {
        registry.emit(
            ClientToServerPacketOpcodes.FIND_GAME,
            name,
            response => {
                resolve(response);
            }
        );
    });
};

const joinGame = (registry: ClientToServerPacketRegsitry, name: string, gameId: string) => {
    return new Promise<JoinLobbyResponse>(resolve => {
        registry.emit(
            ClientToServerPacketOpcodes.JOIN_GAME,
            { name, gameId },
            response => {
                resolve(response);
            }
        );
    });
};

const createGame = (registry: ClientToServerPacketRegsitry, name: string) => {
    return new Promise<JoinLobbyResponse>(resolve => {
        registry.emit(
            ClientToServerPacketOpcodes.CREATE_GAME,
            name,
            response => {
                resolve(response);
            }
        );
    });
};

const subscribe = (registry: ServerToClientPacketRegistry, socket: Socket) => {
    return eventChannel(emit => {
        let deliberateDisconnected = false;

        socket.on("disconnect", () => {
            if (deliberateDisconnected) {
                return;
            }

            emit(clearAnnouncement());
            emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED_WILL_RECONNECT));
        });
        socket.on("reconnect", () => emit(updateConnectionStatus(ConnectionStatus.RECONNECTED_NEED_AUTHENTICATION)));

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
                emit(gamePhaseUpdate(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.LEVEL_UPDATE,
            (packet) => {
                log("[LEVEL_UPDATE]", packet);

                emit(localPlayerLevelUpdate(packet.level, packet.xp));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.NEW_FEED_MESSAGE,
            (packet) => {
                log("[NEW_FEED_MESSAGE]", packet);

                emit(newFeedMessage(packet));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE,
            (packet) => {
                log("[LOBBY_PLAYER_UPDATE]", packet);

                emit(updateLobbyPlayerAction(packet.index, packet.player));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.START_GAME,
            (packet) => {
                log("[START_GAME]", packet);

                emit(joinCompleteAction(packet.localPlayerId, packet.reconnectionSecret, packet.gameId, packet.name));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.FINISH_GAME,
            (packet) => {
                log("[FINISH_GAME]", packet);

                emit(finishGameAction(packet.winnerName));
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

        registry.on(
            ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_SUCCESS,
            (packet) => {
                log("[RECONNECT_AUTHENTICATE_SUCCESS]");

                emit(updateConnectionStatus(ConnectionStatus.RECONNECTED));
                emit(updateReconnectSecret(packet.reconnectSecret));
            }
        );

        registry.on(
            ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_FAILURE,
            () => {
                log("[RECONNECT_AUTH_FAILURE]");

                emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED_FINAL));

                deliberateDisconnected = true;
                socket.disconnect();
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

        takeEvery<ActionWithPayload<{ message: string }>>(
            SEND_CHAT_MESSAGE,
            function*({ payload }) {
                registry.emit(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, payload.message);
            }
        ),
        takeEvery(
            START_LOBBY_GAME,
            function*() {
                registry.emit(ClientToServerPacketOpcodes.START_LOBBY_GAME, { empty: true });
            }
        ),
        takeLatest(
            action => action.type === UPDATE_CONNECTION_STATUS && action.payload.status === ConnectionStatus.RECONNECTED_NEED_AUTHENTICATION,
            function*() {
                const state: AppState = yield select();

                // if player not connected yet, don't try to reconnect
                if (state.localPlayer.id === null) {
                    yield put(updateConnectionStatus(ConnectionStatus.DISCONNECTED_FINAL));
                    return;
                }

                registry.emit(
                    ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE,
                    {
                        gameId: state.game.gameId,
                        playerId: state.localPlayer.id,
                        reconnectSecret: state.localPlayer.reconnectionSecret
                    }
                );
            }
        ),
        yield fork(sendPlayerActions, registry)
    ]);
};

const getResponseForAction = (registry: ClientToServerPacketRegsitry, action: FindGameAction | JoinGameAction | CreateGameAction) => {
    if (action.type === JOIN_GAME) {
        return call(joinGame, registry, action.payload.name, action.payload.gameId);
    }

    if (action.type === FIND_GAME) {
        return call(findGame, registry, action.payload.name);
    }

    if (action.type === CREATE_GAME) {
        return call(createGame, registry, action.payload.name);
    }
};

export const networking = function*() {
    let action: (FindGameAction | JoinGameAction | CreateGameAction)
        = yield take([FIND_GAME, JOIN_GAME, CREATE_GAME]);

    const state: AppState = yield select();

    // this should never happen, but it doesn't hurt to be safe
    const isLoggedIn = state.auth !== null;
    if (!isLoggedIn) {
        signIn();

        return;
    }

    const { idToken } = state.auth;

    let socket: Socket;

    try {
        socket = yield call(getSocket, action.payload.serverIP, idToken);
    } catch (e) {
        signIn();

        return;
    }

    const outgoingRegistry = new OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
        (opcode, payload, ack) => socket.emit(opcode, payload, ack)
    );

    const incomingRegistry = new IncomingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

    yield fork(readPacketsToActions, incomingRegistry, socket);

    while (true) {
        const { error, response }: JoinLobbyResponse = yield getResponseForAction(outgoingRegistry, action);

        if (!error) {
            yield put(joinLobbyAction(
                response.playerId,
                response.lobbyId,
                response.players,
                response.startTimestamp,
                response.isHost
            ));
            break;
        }

        yield put(joinGameError(error));
        action = yield take([FIND_GAME, JOIN_GAME, CREATE_GAME]);
    }

    yield fork(writeActionsToPackets, outgoingRegistry);
};
