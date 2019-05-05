import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork, all } from "@redux-saga/core/effects";
import { Socket, ActionWithPayload } from "../types";
import { GameStateUpdate, PlayingStateUpdate } from "@common/game-state";
import { ServerToClientPacketOpcodes, ClientToServerPacketOpcodes, MovePiecePacket } from "@common/packet-opcodes";
import { PokemonPiece, PlayerListPlayer, PokemonCard, GameState, Constants } from "@common";
import { joinCompleteAction, moneyUpdateAction, gameStatePlayingAction, gameStateUpdate } from "../../actions/gameActions";
import { NetworkAction, sendPacket } from "../../actions/networkActions";
import { SEND_PACKET } from "../../actiontypes/networkActionTypes";
import { piecesUpdated } from "../../actions/pieceActions";
import { playerListUpdated } from "../../actions/playerListActions";
import { cardsUpdated } from "../../actions/cardActions";
import { JOIN_GAME } from "../../actiontypes/gameActionTypes";
import { benchPiecesUpdated } from "../../actions/benchPieceActions";
import { REROLL_CARDS, PURCHASE_CARD } from "../../actiontypes/cardActionTypes";
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH } from "../../actiontypes/pieceActionTypes";
import { TileCoordinates, createTileCoordinates } from "../../../shared/position";

const getSocket = () => {
    const socket = io("http://localhost:3000");

    return new Promise<Socket>(resolve => {
        socket.on("connect", () => {
            resolve(socket);
        });
    });
};

const subscribe = (socket: Socket) => {
    return eventChannel(emit => {
        socket.on(ServerToClientPacketOpcodes.JOINED_GAME, (id: string) => {
            console.log("[JOINED_GAME]");
            emit(joinCompleteAction(id));
        });

        socket.on(ServerToClientPacketOpcodes.BOARD_UPDATE, (packet: { friendly: PokemonPiece[], opponent: PokemonPiece[] }) => {
            console.log("[BOARD_UPDATE]", packet);
            const pieces = [...packet.friendly, ...packet.opponent];
            emit(piecesUpdated(pieces));
        });

        socket.on(ServerToClientPacketOpcodes.BENCH_UPDATE, (packet: { pieces: PokemonPiece[] }) => {
            console.log("[BENCH_UPDATE]", packet);
            emit(benchPiecesUpdated(packet.pieces));
        });

        socket.on(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, (players: PlayerListPlayer[]) => {
            console.log("[PLAYER_LIST_UPDATE]", players);
            emit(playerListUpdated(players));
        });

        socket.on(ServerToClientPacketOpcodes.CARDS_UPDATE, (cards: PokemonCard[]) => {
            console.log("[CARDS_UPDATE]", cards);
            emit(cardsUpdated(cards));
        });

        socket.on(ServerToClientPacketOpcodes.MONEY_UPDATE, (money: number) => {
            console.log("[MONEY_UPDATE]", money);
            emit(moneyUpdateAction(money));
        });

        socket.on(ServerToClientPacketOpcodes.STATE_UPDATE, (packet: { state: GameState, data?: null | GameStateUpdate }) => {
            console.log("[STATE_UPDATE]", packet);

            if (packet.state === GameState.PLAYING) {
                const opponentId = (packet.data as PlayingStateUpdate).opponentId;
                emit(gameStatePlayingAction(opponentId));
            }

            emit(gameStateUpdate(packet.state));
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
        takeEvery<ActionWithPayload<{ index: number }>>(
            PURCHASE_CARD,
            function*({ payload }) {
                yield put(sendPacket(ClientToServerPacketOpcodes.PURCHASE_CARD, payload.index));
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
    const socket: Socket = yield call(getSocket);

    socket.emit(ClientToServerPacketOpcodes.JOIN_GAME, payload.name);

    yield fork(readPacketsToActions, socket);
    yield fork(writeActionsToPackets);
    yield fork(writePacketsToSocket, socket);
};
