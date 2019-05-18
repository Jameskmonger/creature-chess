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
    JoinGameResponse
} from "@common/packet-opcodes";
import { Models, PlayerListPlayer } from "@common";
import { moneyUpdateAction, gamePhaseUpdate, CreateGameAction, JoinGameAction, joinGameError } from "../../actions/gameActions";
import { NetworkAction, sendPacket } from "../../actions/networkActions";
import { SEND_PACKET } from "../../actiontypes/networkActionTypes";
import { BoardActions, BoardActionTypes, BenchActions } from "@common/board";
import { playerListUpdated } from "../../actions/playerListActions";
import { cardsUpdated } from "../../actions/cardActions";
import { JOIN_GAME, CREATE_GAME } from "../../actiontypes/gameActionTypes";
import { REROLL_CARDS, BUY_CARD } from "../../actiontypes/cardActionTypes";
import { TileCoordinates, createTileCoordinates } from "@common/position";
import { log } from "../../log";
import { joinCompleteAction, localPlayerLevelUpdate } from "../../actions/localPlayerActions";
import { BUY_XP } from "../../actiontypes/localPlayerActionTypes";
import { newFeedMessage } from "../../actions/feedActions";
import { FeedMessage } from "@common/feed-message";
import { SEND_CHAT_MESSAGE } from "../../actiontypes/chatActionTypes";
import { BATTLE_FINISHED } from "./processBattle";

const getSocket = (serverIP: string) => {
    const socket = io(serverIP);

    return new Promise<Socket>(resolve => {
        socket.on("connect", () => {
            resolve(socket);
        });
    });
};

const joinGame = (socket: Socket, name: string, gameId: string) => {
    return new Promise<JoinGameResponse>(resolve => {
        socket.emit(ClientToServerPacketOpcodes.JOIN_GAME, name, gameId, (response: JoinGameResponse) => {
            resolve(response);
        });
    });
};

const createGame = (socket: Socket, name: string, playerCount: number, botCount: number) => {
    return new Promise<JoinGameResponse>(resolve => {
        socket.emit(ClientToServerPacketOpcodes.CREATE_GAME, name, playerCount, botCount, (response: JoinGameResponse) => {
            resolve(response);
        });
    });
};

const subscribe = (socket: Socket) => {
    return eventChannel(emit => {
        socket.on(ServerToClientPacketOpcodes.BOARD_UPDATE, (packet: { pieces: Models.Piece[] }) => {
            log("[BOARD_UPDATE]", packet);

            emit(BoardActions.piecesUpdated(packet.pieces));
        });

        socket.on(ServerToClientPacketOpcodes.BENCH_UPDATE, (packet: { pieces: Models.Piece[] }) => {
            log("[BENCH_UPDATE]", packet);
            emit(BenchActions.benchPiecesUpdated(packet.pieces));
        });

        socket.on(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, (players: PlayerListPlayer[]) => {
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
        )
    ]);
};

const writePacketsToSocket = function*(socket: Socket) {
    yield takeEvery<NetworkAction>(SEND_PACKET, ({ payload }) => {
        socket.emit(payload.opcode, ...payload.data);
    });
};

export const networking = function*() {
    let action: (JoinGameAction | CreateGameAction) = yield take([JOIN_GAME, CREATE_GAME]);
    const socket: Socket = yield call(getSocket, action.payload.serverIP);

    yield fork(readPacketsToActions, socket);

    while (true) {
        const { error, response }: JoinGameResponse =
            (action.type === JOIN_GAME)
                ? yield call(joinGame, socket, action.payload.name, action.payload.gameId)
                : yield call(createGame, socket, action.payload.name, action.payload.playerCount, action.payload.botCount);

        if (!error) {
            yield put(joinCompleteAction({
                ...response,
                name: action.payload.name
            }));
            break;
        }

        yield put(joinGameError(error));
        action = yield take([JOIN_GAME, CREATE_GAME]);
    }

    yield fork(writeActionsToPackets);
    yield fork(writePacketsToSocket, socket);
};
