import io = require("socket.io-client");
import { eventChannel } from "redux-saga";
import { call, takeEvery, put, take, fork } from "@redux-saga/core/effects";
import { Socket } from "../types";
import { GameStateUpdate, PlayingStateUpdate } from "../../../shared/game-state";
import { ServerToClientPacketOpcodes, ClientToServerPacketOpcodes } from "../../../shared/packet-opcodes";
import { PokemonPiece, PlayerListPlayer, PokemonCard, GameState, Constants } from "../../../shared";
import { joinCompleteAction, moneyUpdateAction, gameStatePlayingAction, gameStateUpdate } from "../../actions/gameActions";
import { NetworkAction } from "../../actions/networkActions";
import { SEND_PACKET } from "../../actiontypes/networkActionTypes";
import { piecesUpdated } from "../../actions/pieceActions";
import { playerListUpdated } from "../../actions/playerListActions";
import { cardsUpdated } from "../../actions/cardActions";
import { JOIN_GAME } from "../../actiontypes/gameActionTypes";
import { benchPiecesUpdated } from "../../actions/benchPieceActions";

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
                //emit(gameStatePlayingAction(opponentId));
            }

            //emit(gameStateUpdate(packet.state));
        });

        // tslint:disable-next-line:no-empty
        return () => { };
    });
};

const read = function*(socket: Socket) {
    const channel = yield call(subscribe, socket);

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });
};

const write = function*(socket: Socket) {
    yield takeEvery<NetworkAction>(SEND_PACKET, ({ payload }) => {
        socket.emit(payload.opcode, ...payload.data);
    });
};

export const networking = function*() {
    const { payload } = yield take(JOIN_GAME);
    const socket: Socket = yield call(getSocket);

    socket.emit(ClientToServerPacketOpcodes.JOIN_GAME, payload.name);

    yield fork(read, socket);
    yield fork(write, socket);
};
