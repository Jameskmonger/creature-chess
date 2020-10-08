import { Socket } from "socket.io";
import { GamePhase } from "@creature-chess/models";
import { Player} from "@creature-chess/shared";
import { joinGameEvent, newPlayerSocketEvent } from "./events";
import { incomingNetworking } from "./net/incoming";
import { outgoingNetworking } from "./net/outgoing";

export class SocketPlayer extends Player {
    public readonly isConnection = true;

    constructor(socket: Socket, id: string, name: string) {
        super(id, name);

        this.sagaMiddleware.run(incomingNetworking);
        this.sagaMiddleware.run(outgoingNetworking(this.getMatch));

        this.initialiseSocket(socket);
    }

    public reconnectSocket(socket: Socket) {
        this.initialiseSocket(socket);

        const { board, bench, playerInfo: { money, cards, level, xp } } = this.store.getState();

        const players = this.getPlayerListPlayers();

        this.store.dispatch(joinGameEvent({
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
        }));
    }

    public onStartGame(gameId: string) {
        this.store.dispatch(joinGameEvent({ id: gameId }));
    }

    private initialiseSocket(socket: Socket) {
        this.store.dispatch(newPlayerSocketEvent(socket));
    }

    private getJoinGamePhaseUpdate() {
        const { round, phase, phaseStartedAtSeconds } = this.getGameState();

        switch (phase) {
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
