import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all, takeLatest, select } from "@redux-saga/core/effects";
import { Socket, ActionWithPayload } from "../types";
import { Models, ConnectionStatus } from "@common";
import {
    moneyUpdateAction, gamePhaseUpdate, CreateGameAction, JoinGameAction, joinGameError,
    FindGameAction, shopLockUpdated, updateConnectionStatus, clearAnnouncement, finishGameAction
} from "../../actions/gameActions";
import { BoardActions, BoardActionTypes, BenchActions } from "@common/board";
import { playerListUpdated } from "../../../playerList/playerListActions";
import { cardsUpdated } from "../../../cardShop/cardActions";
import { FIND_GAME, JOIN_GAME, CREATE_GAME, TOGGLE_SHOP_LOCK, UPDATE_CONNECTION_STATUS } from "../../actiontypes/gameActionTypes";
import { REROLL_CARDS, BUY_CARD } from "../../../cardShop/cardActionTypes";
import { TileCoordinates, createTileCoordinates } from "@common/position";
import { log } from "../../../log";
import { joinCompleteAction, localPlayerLevelUpdate, updateReconnectSecret } from "../../actions/localPlayerActions";
import { BUY_XP, READY_UP } from "../../actiontypes/localPlayerActionTypes";
import { newFeedMessage } from "../../../feed/feedActions";
import { FeedMessage } from "@common/feed-message";
import { SEND_CHAT_MESSAGE } from "../../../chat/chatActionTypes";
import { BATTLE_FINISHED } from "@common/match/combat/battleEventChannel";
import { joinLobbyAction, updateLobbyPlayerAction } from "../../actions/lobbyActions";
import { START_LOBBY_GAME } from "../../actiontypes/lobbyActionTypes";
import { AppState } from "../../state";
import { IncomingPacketRegistry } from "@common/networking/incoming-packet-registry";
import { ServerToClientPacketDefinitions, ServerToClientPacketOpcodes, JoinLobbyResponse } from "@common/networking/server-to-client";
import { OutgoingPacketRegistry } from "@common/networking/outgoing-packet-registry";
import { ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements, ClientToServerPacketOpcodes } from "@common/networking/client-to-server";

const getSocket = (serverIP: string) => {
    // force to websocket for now until CORS is sorted
    const socket = io(serverIP, { transports: ["websocket", "xhr-polling"] });

    return new Promise<Socket>(resolve => {
        socket.on("connect", () => {
            resolve(socket);
        });
    });
};

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;
type ServerToClientPacketRegistry = IncomingPacketRegistry<ServerToClientPacketDefinitions>;

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

const readPacketsToActions = function* (incomingRegistry: ServerToClientPacketRegistry, socket: Socket) {
    const channel = yield call(subscribe, incomingRegistry, socket);

    yield takeEvery(channel, function* (action) {
        yield put(action);
    });
};

const writeActionsToPackets = function* (registry: ClientToServerPacketRegsitry) {
    yield all([
        takeEvery(
            BATTLE_FINISHED,
            function* () {
                registry.emit(ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
            }
        ),
        takeEvery(
            REROLL_CARDS,
            function* () {
                registry.emit(ClientToServerPacketOpcodes.BUY_REROLL, { empty: true });
            }
        ),
        takeEvery(
            BUY_XP,
            function* () {
                registry.emit(ClientToServerPacketOpcodes.BUY_XP, { empty: true });
            }
        ),
        takeEvery(
            READY_UP,
            function* () {
                registry.emit(ClientToServerPacketOpcodes.READY_UP, { empty: true });
            }
        ),
        takeEvery<ActionWithPayload<{ index: number }>>(
            BUY_CARD,
            function* ({ payload }) {
                registry.emit(ClientToServerPacketOpcodes.BUY_CARD, payload.index);
            }
        ),
        takeEvery<ActionWithPayload<{ pieceId: string }>>(
            BoardActionTypes.SELL_PIECE,
            function* ({ payload }) {
                registry.emit(ClientToServerPacketOpcodes.SELL_PIECE, payload.pieceId);
            }
        ),
        takeEvery<ActionWithPayload<{ piece: Models.Piece, position: TileCoordinates }>>(
            BoardActionTypes.PIECE_MOVED_TO_BOARD,
            function* ({ payload }) {
                registry.emit(
                    ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD,
                    {
                        id: payload.piece.id,
                        from: payload.piece.position,
                        to: payload.position
                    }
                );
            }
        ),
        takeEvery<ActionWithPayload<{ piece: Models.Piece, slot: number }>>(
            BoardActionTypes.PIECE_MOVED_TO_BENCH,
            function* ({ payload }) {
                registry.emit(
                    ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH,
                    {
                        id: payload.piece.id,
                        from: payload.piece.position,
                        to: createTileCoordinates(payload.slot, null)
                    }
                );
            }
        ),
        takeEvery<ActionWithPayload<{ message: string }>>(
            SEND_CHAT_MESSAGE,
            function* ({ payload }) {
                registry.emit(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, payload.message);
            }
        ),
        takeEvery(
            START_LOBBY_GAME,
            function* () {
                registry.emit(ClientToServerPacketOpcodes.START_LOBBY_GAME, { empty: true });
            }
        ),
        takeEvery(
            TOGGLE_SHOP_LOCK,
            function* () {
                registry.emit(ClientToServerPacketOpcodes.TOGGLE_SHOP_LOCK, { empty: true });
            }
        ),
        takeLatest(
            action => action.type === UPDATE_CONNECTION_STATUS && action.payload.status === ConnectionStatus.RECONNECTED_NEED_AUTHENTICATION,
            function* () {
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
        )
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

export const networking = function* () {
    let action: (FindGameAction | JoinGameAction | CreateGameAction)
        = yield take([FIND_GAME, JOIN_GAME, CREATE_GAME]);
    const socket: Socket = yield call(getSocket, action.payload.serverIP);

    const outgoingRegistry = new OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
        (opcode, payload, ack) => socket.emit(opcode, payload, ack)
    );

    const incomingRegistry = new IncomingPacketRegistry<ServerToClientPacketDefinitions>(
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
