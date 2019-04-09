import { EventEmitter } from "events";
import { Socket } from "socket.io";
import { Player } from "./player";

export enum OutgoingPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    BOARD_UPDATE = "boardUpdate"
}

export enum IncomingPacketOpcodes {
    PURCHASE_CARD = "purchaseCard",
    REFRESH_CARDS = "refreshCards"
}

type IncomingPacketListener = (...args: any[]) => void;

export class Connection {
    private socket: Socket;
    private player: Player;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public setPlayer(player: Player) {
        this.player = player;
    }

    public getPlayer() {
        return this.player;
    }

    public onReceivePacket(opcode: IncomingPacketOpcodes, listener: IncomingPacketListener) {
        this.socket.on(opcode, listener);
    }

    public sendPacket(opcode: OutgoingPacketOpcodes, ...data: any[]) {
        this.socket.emit(opcode, ...data);
    }
}
