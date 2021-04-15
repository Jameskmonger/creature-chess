import { Socket } from "socket.io";
import { Player } from "@creature-chess/gamemode";
import { OutgoingPacketRegistry, ServerToClient } from "@creature-chess/networking";
import { newPlayerSocketEvent } from "./events";
import { incomingNetworking } from "./net/incoming";
import { outgoingNetworking } from "./net/outgoing";

export class SocketPlayer extends Player {
    public readonly isConnection = true;

    constructor(socket: Socket, id: string, name: string, picture: number) {
        // todo fix typing
        super(id, name, picture);

        this.sagaMiddleware.run(incomingNetworking, this.getLogger);
        this.sagaMiddleware.run(outgoingNetworking, this.getLogger, id, this.getMatch, { boardSlice: this.boardSlice, benchSlice: this.benchSlice });

        this.initialiseSocket(socket);
    }

    public reconnectSocket(socket: Socket) {
        this.initialiseSocket(socket);

        const registry = new OutgoingPacketRegistry<ServerToClient.Menu.PacketDefinitions, ServerToClient.Menu.PacketAcknowledgements>(
            (opcode, payload) => socket.emit(opcode, payload)
        );

        const match = this.getMatch();
        const board = match ? match.getBoardForPlayer(this.id) : this.getBoard();
        const opponentId = match ? match.away.id : null;
        const battleTurn = match ? match.getTurn() : null;

        registry.emit(
            ServerToClient.Menu.PacketOpcodes.GAME_CONNECTED,
            {
                board,
                bench: this.getBench(),
                game: this.getRoundInfoState(),
                players: this.getPlayerListPlayers(),
                battleTurn,
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
