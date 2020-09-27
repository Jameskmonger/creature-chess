import uuid = require("uuid/v4");
import { all, takeLatest, select } from "@redux-saga/core/effects";
import { Socket } from "socket.io";
import { Player } from "@creature-chess/shared/game/player/player";
import { LobbyPlayer, PlayerListPlayer, Card, GamePhase } from "@creature-chess/models";
import { IncomingPacketRegistry } from "@creature-chess/shared/networking/incoming-packet-registry";
import { ClientToServerPacketDefinitions, ClientToServerPacketOpcodes, SendPlayerActionsPacket, ClientToServerPacketAcknowledgements } from "@creature-chess/shared/networking/client-to-server";
import { ServerToClientPacketOpcodes, ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements, PhaseUpdatePacket, JoinGamePacket } from "@creature-chess/shared/networking/server-to-client";
import { OutgoingPacketRegistry } from "@creature-chess/shared/networking/outgoing-packet-registry";
import { log } from "console";
import { TOGGLE_SHOP_LOCK, BUY_CARD, PLAYER_SELL_PIECE, REROLL_CARDS, PLAYER_DROP_PIECE, READY_UP, BUY_XP, QUIT_GAME } from "@creature-chess/shared/player/actions";
import { gamePhaseUpdate, MoneyUpdateAction, MONEY_UPDATE } from "@creature-chess/shared/player/gameInfo";
import { Task } from "redux-saga";
import { PlayerState } from "@creature-chess/shared/player/store";
import { CardsUpdatedAction, CARDS_UPDATED } from "@creature-chess/shared/player/cardShop/actions";
import { LevelUpdateAction, LEVEL_UPDATE } from "@creature-chess/shared/player/level/actions";

const outgoingPackets = (registry: OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>) => {
    return function*() {
        yield all([
            yield takeLatest<CardsUpdatedAction>(
                CARDS_UPDATED,
                function*() {
                    const cards: Card[] = yield select((state: PlayerState) => state.cards);

                    registry.emit(ServerToClientPacketOpcodes.CARDS_UPDATE, cards);
                }
            ),
            yield takeLatest<MoneyUpdateAction>(
                MONEY_UPDATE,
                function*() {
                    const money: number = yield select((state: PlayerState) => state.gameInfo.money);

                    registry.emit(ServerToClientPacketOpcodes.MONEY_UPDATE, money);
                }
            ),
            yield takeLatest<LevelUpdateAction>(
                [LEVEL_UPDATE],
                function*() {
                    const level: { level: number, xp: number } = yield select((state: PlayerState) => state.level);

                    registry.emit(ServerToClientPacketOpcodes.LEVEL_UPDATE, level);
                }
            )
        ]);
    };
};

export class SocketPlayer extends Player {
    public readonly isBot: boolean = false;
    public readonly isConnection = true;

    private socket: Socket;
    private incomingPacketRegistry: IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;
    private outgoingPacketRegistry: OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;
    private lastReceivedPacketIndex = 0;
    private outgoingPacketsTask: Task = null;

    constructor(socket: Socket, id: string, name: string) {
        super(id, name);

        this.setSocket(socket);
    }

    public setSocket(socket: Socket) {
        this.clearSocket();

        this.socket = socket;
        this.lastReceivedPacketIndex = 0;

        this.incomingPacketRegistry = new IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
            (opcode, handler) => socket.on(opcode, handler)
        );

        this.outgoingPacketRegistry = new OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
            (opcode, payload, ack) => socket.emit(opcode, payload, ack)
        );

        if (this.outgoingPacketsTask) {
            this.outgoingPacketsTask.cancel();
        }

        this.outgoingPacketsTask = this.sagaMiddleware.run(outgoingPackets(this.outgoingPacketRegistry));

        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.FINISH_MATCH, this.finishMatch);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, this.receiveActions);
    }

    public onStartGame() {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.JOIN_GAME,
            {
                type: "game",
                payload: {
                    localPlayerId: this.id
                }
            }
        );
    }

    public sendJoinGamePacket(packet: JoinGamePacket) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.JOIN_GAME, packet);
    }

    public onFinishGame(winner: Player) {
        super.onFinishGame(winner);

        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.FINISH_GAME,
            {
                winnerName: winner.name
            }
        );

        this.clearSocket();
    }

    public onDeath(phaseStartedAt: number) {
        const packet: PhaseUpdatePacket = { startedAt: phaseStartedAt, phase: GamePhase.DEAD };
        this.store.dispatch(gamePhaseUpdate(packet));
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public onPlayerListUpdate(players: PlayerListPlayer[]) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, players);
    }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE,
            {
                index,
                player
            }
        );
    }

    public onPlayersResurrected(playerIds: string[]) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PLAYERS_RESURRECTED, { playerIds });
    }

    protected onEnterPreparingPhase(startedAt: number, round: number) {
        const { board, bench, cards } = this.store.getState();

        const packet: PhaseUpdatePacket = {
            startedAt,
            phase: GamePhase.PREPARING,
            payload: {
                round,
                pieces: {
                    board,
                    bench
                },
                cards
            }
        };
        this.store.dispatch(gamePhaseUpdate(packet));
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onEnterReadyPhase(startedAt: number) {
        const packet: PhaseUpdatePacket = {
            startedAt,
            phase: GamePhase.READY,
            payload: {
                board: this.match.getBoard(),
                bench: this.getBench(),
                opponentId: this.match.away.id
            }
        };
        this.store.dispatch(gamePhaseUpdate(packet));
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onEnterPlayingPhase(startedAt: number) {
        const packet: PhaseUpdatePacket = { startedAt, phase: GamePhase.PLAYING };
        this.store.dispatch(gamePhaseUpdate(packet));
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onShopLockUpdate() {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE,
            {
                locked: this.shopLocked
            }
        );
    }

    private receiveActions = (packet: SendPlayerActionsPacket, ack: (accepted: boolean, packetIndex?: number) => void) => {
        const expectedPacketIndex = this.lastReceivedPacketIndex + 1;

        if (expectedPacketIndex !== packet.index) {
            ack(false);
            return;
        }

        for (const action of packet.actions) {
            switch (action.type) {
                case BUY_CARD: {
                    this.store.dispatch(action);
                    break;
                }
                case QUIT_GAME: {
                    this.clearSocket();

                    this.quitGame();
                    break;
                }
                case TOGGLE_SHOP_LOCK: {
                    this.toggleShopLock();
                    break;
                }
                case PLAYER_SELL_PIECE: {
                    this.sellPiece(action.payload.pieceId);
                    break;
                }
                case REROLL_CARDS: {
                    this.buyReroll();
                    break;
                }
                case PLAYER_DROP_PIECE: {
                    this.onDropPiece(action);
                    break;
                }
                case BUY_XP: {
                    this.buyXp();
                    break;
                }
                case READY_UP: {
                    this.readyUp();
                    break;
                }
                default: {
                    log(`Unhandled action type for player ${this.name}`);
                    break;
                }
            }
        }

        this.lastReceivedPacketIndex = packet.index;
        ack(true, packet.index);
    }

    private clearSocket() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket.removeAllListeners();
            this.socket = null;
        }

        if (this.outgoingPacketsTask) {
            this.outgoingPacketsTask.cancel();

            this.outgoingPacketsTask = null;
        }

        this.incomingPacketRegistry = null;
        this.outgoingPacketRegistry = null;
    }
}
