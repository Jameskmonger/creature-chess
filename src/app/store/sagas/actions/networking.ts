import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all } from "@redux-saga/core/effects";
import { Socket, ActionWithPayload } from "../types";
import {
    ServerToClientPacketOpcodes,
    ClientToServerPacketOpcodes,
    MovePiecePacket,
    PhaseUpdatePacket,
    LevelUpdatePacket,
    JoinLobbyResponse,
    LobbyPlayerUpdatePacket,
    StartGamePacket
} from "@common/packet-opcodes";
import { Models } from "@common";
import { moneyUpdateAction, gamePhaseUpdate, CreateGameAction, JoinGameAction, joinGameError, FindGameAction, serverDisconnected } from "../../actions/gameActions";
import { NetworkAction, sendPacket } from "../../actions/networkActions";
import { SEND_PACKET } from "../../actiontypes/networkActionTypes";
import { BoardActions, BoardActionTypes, BenchActions } from "@common/board";
import { playerListUpdated } from "../../../playerList/playerListActions";
import { cardsUpdated } from "../../../cardShop/cardActions";
import { FIND_GAME, JOIN_GAME, CREATE_GAME } from "../../actiontypes/gameActionTypes";
import { REROLL_CARDS, BUY_CARD } from "../../../cardShop/cardActionTypes";
import { TileCoordinates, createTileCoordinates } from "@common/position";
import { log } from "../../../log";
import { joinCompleteAction, localPlayerLevelUpdate } from "../../actions/localPlayerActions";
import { BUY_XP, READY_UP } from "../../actiontypes/localPlayerActionTypes";
import { newFeedMessage } from "../../../feed/feedActions";
import { FeedMessage } from "@common/feed-message";
import { SEND_CHAT_MESSAGE } from "../../../chat/chatActionTypes";
import { BATTLE_FINISHED } from "@common/match/combat/battleEventChannel";
import { joinLobbyAction, updateLobbyPlayerAction } from '../../actions/lobbyActions';
import { START_LOBBY_GAME } from '../../actiontypes/lobbyActionTypes';

const getSocket = (serverIP: string) => {
    // force to websocket for now until CORS is sorted
    const socket = io(serverIP, { transports: [ "websocket" ], reconnection: false });

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
        socket.on("disconnect", () => emit(serverDisconnected()));

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

            emit(joinCompleteAction({ playerId: packet.localPlayerId, gameId: packet.gameId, name: packet.name}));
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
