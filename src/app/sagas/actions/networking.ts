import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all } from "@redux-saga/core/effects";
import { Socket, ActionWithPayload } from "../types";
import { ServerToClientPacketOpcodes, ClientToServerPacketOpcodes, MovePiecePacket, PhaseUpdatePacket, LevelUpdatePacket } from "@common/packet-opcodes";
import { PokemonPiece, PlayerListPlayer, PokemonCard } from "@common";
import { moneyUpdateAction, gamePhaseUpdate } from "../../actions/gameActions";
import { NetworkAction, sendPacket } from "../../actions/networkActions";
import { SEND_PACKET } from "../../actiontypes/networkActionTypes";
import { piecesUpdated } from "../../actions/pieceActions";
import { playerListUpdated } from "../../actions/playerListActions";
import { cardsUpdated } from "../../actions/cardActions";
import { JOIN_GAME } from "../../actiontypes/gameActionTypes";
import { benchPiecesUpdated } from "../../actions/benchPieceActions";
import { REROLL_CARDS, PURCHASE_CARD } from "../../actiontypes/cardActionTypes";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "../../actiontypes/pieceActionTypes";
import { TileCoordinates, createTileCoordinates } from "../../../shared/position";
import { log } from "../../log";
import { joinCompleteAction, localPlayerLevelUpdate } from "../../actions/localPlayerActions";
import { BUY_XP } from "../../actiontypes/localPlayerActionTypes";

const getSocket = (serverIP: string) => {
    const socket = io(serverIP);

    return new Promise<Socket>(resolve => {
        socket.on("connect", () => {
            resolve(socket);
        });
    });
};

const joinGame = (socket: Socket, name: string) => {
    return new Promise<string>(resolve => {
        socket.emit(ClientToServerPacketOpcodes.JOIN_GAME, name, (id: string) => {
            resolve(id);
        });
    });
};

const subscribe = (socket: Socket) => {
    return eventChannel(emit => {
        socket.on(ServerToClientPacketOpcodes.BOARD_UPDATE, (packet: { pieces: PokemonPiece[] }) => {
            log("[BOARD_UPDATE]", packet);

            emit(piecesUpdated(packet.pieces));
        });

        socket.on(ServerToClientPacketOpcodes.BENCH_UPDATE, (packet: { pieces: PokemonPiece[] }) => {
            log("[BENCH_UPDATE]", packet);
            emit(benchPiecesUpdated(packet.pieces));
        });

        socket.on(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, (players: PlayerListPlayer[]) => {
            log("[PLAYER_LIST_UPDATE]", players);
            emit(playerListUpdated(players));
        });

        socket.on(ServerToClientPacketOpcodes.CARDS_UPDATE, (cards: PokemonCard[]) => {
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
            REROLL_CARDS,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.REROLL_CARDS));
            }
        ),
        takeEvery(
            BUY_XP,
            function*() {
                yield put(sendPacket(ClientToServerPacketOpcodes.BUY_XP));
            }
        ),
        takeEvery<ActionWithPayload<{ index: number }>>(
            PURCHASE_CARD,
            function*({ payload }) {
                yield put(sendPacket(ClientToServerPacketOpcodes.PURCHASE_CARD, payload.index));
            }
        ),
        takeEvery<ActionWithPayload<{ pieceId: string }>>(
            SELL_PIECE,
            function*({ payload }) {
                yield put(sendPacket(ClientToServerPacketOpcodes.SELL_PIECE, payload.pieceId));
            }
        ),
        takeEvery<ActionWithPayload<{ piece: PokemonPiece, position: TileCoordinates }>>(
            PIECE_MOVED_TO_BOARD,
            function*({ payload }) {
                const packet: MovePiecePacket = {
                    id: payload.piece.id,
                    from: payload.piece.position,
                    to: payload.position
                };

                yield put(sendPacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, packet));
            }
        ),
        takeEvery<ActionWithPayload<{ piece: PokemonPiece, slot: number }>>(
            PIECE_MOVED_TO_BENCH,
            function*({ payload }) {
                const packet: MovePiecePacket = {
                    id: payload.piece.id,
                    from: payload.piece.position,
                    to: createTileCoordinates(payload.slot, null)
                };

                yield put(sendPacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, packet));
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
    const { payload } = yield take(JOIN_GAME);
    const socket: Socket = yield call(getSocket, payload.serverIP);

    yield fork(readPacketsToActions, socket);

    const id: string = yield call(joinGame, socket, payload.name);
    yield put(joinCompleteAction(id, payload.name));

    yield fork(writeActionsToPackets);
    yield fork(writePacketsToSocket, socket);
};
