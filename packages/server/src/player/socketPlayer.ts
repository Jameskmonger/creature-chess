import uuid = require("uuid/v4");
import { all, takeLatest, select } from "@redux-saga/core/effects";
import { Socket } from "socket.io";
import { Player } from "@creature-chess/shared/game/player/player";
import { PlayerListPlayer, Card, GamePhase } from "@creature-chess/models";
import { IncomingPacketRegistry } from "@creature-chess/shared/networking/incoming-packet-registry";
import { ClientToServerPacketDefinitions, ClientToServerPacketOpcodes, SendPlayerActionsPacket, ClientToServerPacketAcknowledgements } from "@creature-chess/shared/networking/client-to-server";
import { ServerToClientPacketOpcodes, ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements, PhaseUpdatePacket, PlayerGameState } from "@creature-chess/shared/networking/server-to-client";
import { OutgoingPacketRegistry } from "@creature-chess/shared/networking/outgoing-packet-registry";
import { log } from "console";
import { TOGGLE_SHOP_LOCK, BUY_CARD, PLAYER_SELL_PIECE, REROLL_CARDS, PLAYER_DROP_PIECE, READY_UP, BUY_XP, QUIT_GAME } from "@creature-chess/shared/player/actions";
import { CardsUpdatedAction, CARDS_UPDATED, LevelUpdateAction, LEVEL_UPDATE, MoneyUpdateAction, MONEY_UPDATE, SHOP_LOCK_UPDATED, UpdateShopLockAction } from "@creature-chess/shared/player/playerInfo";
import { Task } from "redux-saga";
import { PlayerState } from "@creature-chess/shared/player/store";

const outgoingPackets = (registry: OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>) => {
    return function*() {
        yield all([
            yield takeLatest<CardsUpdatedAction>(
                CARDS_UPDATED,
                function*() {
                    const cards: Card[] = yield select((state: PlayerState) => state.playerInfo.cards);

                    registry.emit(ServerToClientPacketOpcodes.CARDS_UPDATE, cards);
                }
            ),
            yield takeLatest<MoneyUpdateAction>(
                MONEY_UPDATE,
                function*() {
                    const money: number = yield select((state: PlayerState) => state.playerInfo.money);

                    registry.emit(ServerToClientPacketOpcodes.MONEY_UPDATE, money);
                }
            ),
            yield takeLatest<LevelUpdateAction>(
                [LEVEL_UPDATE],
                function*() {
                    const level: number = yield select((state: PlayerState) => state.playerInfo.level);
                    const xp: number = yield select((state: PlayerState) => state.playerInfo.xp);

                    registry.emit(ServerToClientPacketOpcodes.LEVEL_UPDATE, { level, xp });
                }
            ),
            yield takeLatest<UpdateShopLockAction>(
                [SHOP_LOCK_UPDATED],
                function*() {
                    const locked: boolean = yield select((state: PlayerState) => state.playerInfo.shopLocked);

                    registry.emit(ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, { locked });
                }
            )
        ]);
    };
};

export class SocketPlayer extends Player {
    public readonly isConnection = true;

    private socket: Socket;
    private incomingPacketRegistry: IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;
    private outgoingPacketRegistry: OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;
    private lastReceivedPacketIndex = 0;
    private outgoingPacketsTask: Task = null;

    constructor(socket: Socket, id: string, name: string) {
        super(id, name);

        this.initialiseSocket(socket);
    }

    public reconnectSocket(socket: Socket) {
        this.clearSocket();

        this.initialiseSocket(socket);

        const { board, bench, playerInfo: { money, cards, level, xp } } = this.store.getState();

        const players = this.getPlayerListPlayers();

        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.JOIN_GAME, {
            id: "",
            fullState: {
                phase: this.getJoinGamePhaseUpdate(),
                players,
                board: board.pieces,
                bench,
                cards,
                money,
                level: {
                    level,
                    xp
                }
            }
        });
    }

    public onStartGame(gameId: string) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.JOIN_GAME, { id: gameId });
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

    public onDeath(startedAtSeconds: number) {
        const packet: PhaseUpdatePacket = { startedAtSeconds, phase: GamePhase.DEAD };
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public onPlayerListUpdate(players: PlayerListPlayer[]) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, players);
    }

    public onPlayersResurrected(playerIds: string[]) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PLAYERS_RESURRECTED, { playerIds });
    }

    protected onEnterPreparingPhase() {
        const { board, bench, playerInfo: { cards } } = this.store.getState();
        const { phaseStartedAtSeconds, round } = this.getGameState();

        const packet: PhaseUpdatePacket = {
            startedAtSeconds: phaseStartedAtSeconds,
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
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onEnterReadyPhase() {
        const { phaseStartedAtSeconds } = this.getGameState();

        const packet: PhaseUpdatePacket = {
            startedAtSeconds: phaseStartedAtSeconds,
            phase: GamePhase.READY,
            payload: {
                board: this.match.getBoard(),
                bench: this.getBench(),
                opponentId: this.match.away.id
            }
        };
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onEnterPlayingPhase(startedAtSeconds: number) {
        const packet: PhaseUpdatePacket = { startedAtSeconds, phase: GamePhase.PLAYING };
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    private receiveActions = (packet: SendPlayerActionsPacket, ack: (accepted: boolean, packetIndex?: number) => void) => {
        const expectedPacketIndex = this.lastReceivedPacketIndex + 1;

        if (expectedPacketIndex !== packet.index) {
            ack(false);
            return;
        }

        for (const action of packet.actions) {
            switch (action.type) {
                case BUY_CARD:
                case TOGGLE_SHOP_LOCK:
                case PLAYER_DROP_PIECE:
                case READY_UP:
                case PLAYER_SELL_PIECE:
                case REROLL_CARDS:
                case BUY_XP: {
                    this.store.dispatch(action);
                    break;
                }
                case QUIT_GAME: {
                    this.clearSocket();

                    this.quitGame();
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

    private initialiseSocket(socket: Socket) {
        this.socket = socket;
        this.lastReceivedPacketIndex = 0;

        this.incomingPacketRegistry = new IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
            (opcode, handler) => socket.on(opcode, handler)
        );

        this.outgoingPacketRegistry = new OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
            (opcode, payload, ack) => socket.emit(opcode, payload, ack)
        );

        this.outgoingPacketsTask = this.sagaMiddleware.run(outgoingPackets(this.outgoingPacketRegistry));

        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.FINISH_MATCH, this.finishMatch);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, this.receiveActions);
    }

    private getJoinGamePhaseUpdate() {
        const { round, phase, phaseStartedAtSeconds } = this.getGameState();

        switch (phase) {
            case GamePhase.DEAD:
                return {
                    startedAtSeconds: phaseStartedAtSeconds,
                    phase
                };
            case GamePhase.PREPARING:
                return {
                    startedAtSeconds: phaseStartedAtSeconds,
                    phase,
                    payload: {
                        round,
                        pieces: {
                            board: this.getBoard(),
                            bench: this.getBench()
                        },
                        cards: this.getCards()
                    }
                };
            case GamePhase.READY:
                // todo figure out why match can be null at this point
                const match = this.getMatch();
                const board = match ? match.getBoard() : null;

                return {
                    startedAtSeconds: phaseStartedAtSeconds,
                    phase,
                    payload: {
                        board,
                        bench: this.getBench(),
                        opponentId: this.getMatch().away.id
                    }
                };
            case GamePhase.PLAYING:
                return {
                    startedAtSeconds: phaseStartedAtSeconds,
                    phase,
                };
            default:
                return null;
        }
    }
}
