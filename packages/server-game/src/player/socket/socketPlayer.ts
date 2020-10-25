import { Socket } from "socket.io";
import { OutgoingPacketRegistry, Player, ServerToClientMenuPacketAcknowledgements, ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketOpcodes} from "@creature-chess/shared";
import { newPlayerSocketEvent } from "./events";
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

        const registry = new OutgoingPacketRegistry<ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketAcknowledgements>(
            (opcode, payload) => socket.emit(opcode, payload)
        );

        const match = this.getMatch();
        const board = match ? match.getBoard() : this.getBoard();
        const opponentId = match ? match.away.id : null;

        registry.emit(
            ServerToClientMenuPacketOpcodes.GAME_CONNECTED,
            {
                board,
                bench: this.getBench(),
                game: this.getGameState(),
                players: this.getPlayerListPlayers(),
                playerInfo: {
                    cards: this.getCards(),
                    health: this.getHealth(),
                    level: this.getLevel(),
                    xp: this.getXp(),
                    money: this.getMoney(),
                    opponentId,
                    shopLocked: this.getShopLocked()
                }
            }
        );
    }

    private initialiseSocket(socket: Socket) {
        // todo run a saga here and cancel the old one, this event is unnecessary
        this.store.dispatch(newPlayerSocketEvent(socket));
    }
}
