import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all, takeLatest, select } from "@redux-saga/core/effects";
import { Socket, ActionWithPayload } from "../types";
import {
    ServerToClientPacketOpcodes,
    ClientToServerPacketOpcodes,
    MovePiecePacket,
    PhaseUpdatePacket,
    LevelUpdatePacket,
    JoinLobbyResponse,
    LobbyPlayerUpdatePacket,
    StartGamePacket,
    ShopLockUpdatePacket,
    ReconnectAuthenticatePacket,
    ReconnectAuthenticateSuccessPacket
} from "@common/packet-opcodes";
import { Models, ConnectionStatus } from "@common";
import { moneyUpdateAction, gamePhaseUpdate, CreateGameAction, JoinGameAction, joinGameError, FindGameAction, shopLockUpdated, updateConnectionStatus, clearAnnouncement } from "../../actions/gameActions";
import { NetworkAction, sendPacket } from "../../actions/networkActions";
import { SEND_PACKET } from "../../actiontypes/networkActionTypes";
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
import { joinLobbyAction, updateLobbyPlayerAction } from '../../actions/lobbyActions';
import { START_LOBBY_GAME } from '../../actiontypes/lobbyActionTypes';
import { AppState } from '../../state';

const getSocket = (serverIP: string) => {
    // force to websocket for now until CORS is sorted
    const socket = io(serverIP, { transports: ['websocket', 'xhr-polling'] });

    return new Promise<Socket>(resolve => {
        socket.on("connect", () => {
            resolve(socket);
        });
    });
};

const findGame = (socket: Socket, name: string) => {
    return new Promise<JoinLobbyResponse>(resolve => {
        socket.emit(ClientToServerPacketOpcodes.FIND_GAME, name, (response: JoinLobbyResponse) => {
            resolve(response);
        });
    });
};

const joinGame = (socket: Socket, name: string, gameId: string) => {
    return new Promise<JoinLobbyResponse>(resolve => {
        socket.emit(ClientToServerPacketOpcodes.JOIN_GAME, name, gameId, (response: JoinLobbyResponse) => {
            resolve(response);
        });
    });
};

const createGame = (socket: Socket, name: string) => {
    return new Promise<JoinLobbyResponse>(resolve => {
        socket.emit(ClientToServerPacketOpcodes.CREATE_GAME, name, (response: JoinLobbyResponse) => {
            resolve(response);
        });
    });
};

const subscribe = (socket: Socket) => {
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

        socket.on(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, (players: Models.PlayerListPlayer[]) => {
            log("[PLAYER_LIST_UPDATE]", players);
            emit(playerListUpdated(players));
        });

        socket.on(ServerToClientPacketOpcodes.CARDS_UPDATE, (cards: Models.Card[]) => {
            log("[CARDS_UPDATE]", cards);
            emit(cardsUpdated(cards));
        });

        socket.on(ServerToClientPacketOpcodes.MONEY_UPDATE, (money: number) => {
            log("[MONEY_UPDATE]", money);
            emit(moneyUpdateAction(money));
        });

        socket.on(ServerToClientPacketOpcodes.PHASE_UPDATE, (packet: PhaseUpdatePacket) => {
            log("[PHASE_UPDATE]", packet);

            emit(updateConnectionStatus(ConnectionStatus.CONNECTED));
            emit(gamePhaseUpdate(packet));
        });

        socket.on(ServerToClientPacketOpcodes.LEVEL_UPDATE, (packet: LevelUpdatePacket) => {
            log("[LEVEL_UPDATE]", packet);

            emit(localPlayerLevelUpdate(packet.level, packet.xp));
        });

        socket.on(ServerToClientPacketOpcodes.NEW_FEED_MESSAGE, (packet: FeedMessage) => {
            log("[NEW_FEED_MESSAGE]", packet);

            emit(newFeedMessage(packet));
        });

        socket.on(ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE, (packet: LobbyPlayerUpdatePacket) => {
            log("[LOBBY_PLAYER_UPDATE]", packet);

            emit(updateLobbyPlayerAction(packet.index, packet.player));
        });

        socket.on(ServerToClientPacketOpcodes.START_GAME, (packet: StartGamePacket) => {
            log("[START_GAME]", packet);

            emit(joinCompleteAction(packet.localPlayerId, packet.reconnectionSecret, packet.gameId, packet.name));
        });

        socket.on(ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, (packet: ShopLockUpdatePacket) => {
            log("[SHOP_LOCK_UPDATE]", packet);

            emit(shopLockUpdated(packet.locked));
        });

        socket.on(ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_SUCCESS, (packet: ReconnectAuthenticateSuccessPacket) => {
            log("[RECONNECT_AUTHENTICATE_SUCCESS]");

            emit(updateConnectionStatus(ConnectionStatus.RECONNECTED));
            emit(updateReconnectSecret(packet.reconnectSecret));
        });

        socket.on(ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_FAILURE, () => {
            log("[RECONNECT_AUTH_FAILURE]");

            emit(updateConnectionStatus(ConnectionStatus.DISCONNECTED_FINAL));

            deliberateDisconnected = true;
            socket.disconnect();
        });

        // tslint:disable-next-line:no-empty
        return () => { };
    });
};

const readPacketsToActions = function*(socket: Socket) {
    const channel = yield call(subscribe, socket);

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });
};

const writeActionsToPackets = function*() {
    yield all([
        takeEvery(
            BATTLE_FINISHED,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.FINISH_MATCH));
            }
        ),
        takeEvery(
            REROLL_CARDS,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.BUY_REROLL));
            }
        ),
        takeEvery(
            BUY_XP,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.BUY_XP));
            }
        ),
        takeEvery(
            READY_UP,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.READY_UP));
            }
        ),
        takeEvery<ActionWithPayload<{ index: number }>>(
            BUY_CARD,
            function*({ payload }) {
                yield put(sendPacket(ClientToServerPacketOpcodes.BUY_CARD, payload.index));
            }
        ),
        takeEvery<ActionWithPayload<{ pieceId: string }>>(
            BoardActionTypes.SELL_PIECE,
            function*({ payload }) {
                yield put(sendPacket(ClientToServerPacketOpcodes.SELL_PIECE, payload.pieceId));
            }
        ),
        takeEvery<ActionWithPayload<{ piece: Models.Piece, position: TileCoordinates }>>(
            BoardActionTypes.PIECE_MOVED_TO_BOARD,
            function*({ payload }) {
                const packet: MovePiecePacket = {
                    id: payload.piece.id,
                    from: payload.piece.position,
                    to: payload.position
                };

                yield put(sendPacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, packet));
            }
        ),
        takeEvery<ActionWithPayload<{ piece: Models.Piece, slot: number }>>(
            BoardActionTypes.PIECE_MOVED_TO_BENCH,
            function*({ payload }) {
                const packet: MovePiecePacket = {
                    id: payload.piece.id,
                    from: payload.piece.position,
                    to: createTileCoordinates(payload.slot, null)
                };

                yield put(sendPacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, packet));
            }
        ),
        takeEvery<ActionWithPayload<{ message: string }>>(
            SEND_CHAT_MESSAGE,
            function*({ payload }) {
                yield put(sendPacket(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, payload.message));
            }
        ),
        takeEvery(
            START_LOBBY_GAME,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.START_LOBBY_GAME));
            }
        ),
        takeEvery(
            TOGGLE_SHOP_LOCK,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.TOGGLE_SHOP_LOCK));
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

                const packet: ReconnectAuthenticatePacket = {
                    gameId: state.game.gameId,
                    playerId: state.localPlayer.id,
                    reconnectSecret: state.localPlayer.reconnectionSecret
                };
            
                yield put(sendPacket(ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE, packet));
            }
        )
    ]);
};

const writePacketsToSocket = function*(socket: Socket) {
    yield takeEvery<NetworkAction>(SEND_PACKET, ({ payload }) => {
        socket.emit(payload.opcode, ...payload.data);
    });
};

const getResponseForAction = (socket: Socket, action: FindGameAction | JoinGameAction | CreateGameAction) => {
    if (action.type === JOIN_GAME) {
        return call(joinGame, socket, action.payload.name, action.payload.gameId);
    }

    if (action.type === FIND_GAME) {
        return call(findGame, socket, action.payload.name);
    }

    if (action.type === CREATE_GAME) {
        return call(createGame, socket, action.payload.name);
    }
};

export const networking = function*() {
    let action: (FindGameAction | JoinGameAction | CreateGameAction)
        = yield take([FIND_GAME, JOIN_GAME, CREATE_GAME]);
    const socket: Socket = yield call(getSocket, action.payload.serverIP);

    yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

    yield fork(readPacketsToActions, socket);

    while (true) {
        const { error, response }: JoinLobbyResponse = yield getResponseForAction(socket, action);

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

    yield fork(writeActionsToPackets);
    yield fork(writePacketsToSocket, socket);
};
