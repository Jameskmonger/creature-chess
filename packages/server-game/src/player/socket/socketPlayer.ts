import { take } from "@redux-saga/core/effects";
import { Socket } from "socket.io";
import { PlayerListPlayer, GamePhase } from "@creature-chess/models";
import {
    Player, PlayerActions, ServerToClientPacketOpcodes, PhaseUpdatePacket
} from "@creature-chess/shared";
import { newPlayerSocketEvent } from "./events";
import { incomingNetworking } from "./net/incoming";
import { outgoingNetworking } from "./net/outgoing";

export class SocketPlayer extends Player {
    public readonly isConnection = true;

    private socket: Socket;

    constructor(socket: Socket, id: string, name: string) {
        super(id, name);

        this.sagaMiddleware.run(this.socketQuitGameSaga());
        this.sagaMiddleware.run(incomingNetworking);
        this.sagaMiddleware.run(outgoingNetworking);

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

        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.FINISH_GAME, { winnerName: winner.name });

        this.clearSocket();
    }

    public onDeath(startedAtSeconds: number) {
        const packet: PhaseUpdatePacket = { startedAtSeconds, phase: GamePhase.DEAD };
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public onPlayersResurrected(playerIds: string[]) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PLAYERS_RESURRECTED, { playerIds });
    }

    private clearSocket() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket.removeAllListeners();
            this.socket = null;
        }
    }

    private initialiseSocket(socket: Socket) {
        this.socket = socket;

        this.store.dispatch(newPlayerSocketEvent(socket));
    }

    private socketQuitGameSaga() {
        return function*() {
            yield take<PlayerActions.QuitGameAction>(PlayerActions.QUIT_GAME_ACTION);

            this.clearSocket();
        };
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
