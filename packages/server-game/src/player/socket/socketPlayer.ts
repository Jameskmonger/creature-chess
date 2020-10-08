import { Socket } from "socket.io";
import { GamePhase } from "@creature-chess/models";
import { Player} from "@creature-chess/shared";
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
    }

    private initialiseSocket(socket: Socket) {
        this.store.dispatch(newPlayerSocketEvent(socket));
    }
}
