import { Socket } from "socket.io";
import { Player } from "./player";
import { ClientToServerPacketOpcodes, ServerToClientPacketOpcodes } from "../shared/packet-opcodes";

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

    public onReceivePacket(opcode: ClientToServerPacketOpcodes, listener: IncomingPacketListener) {
        this.socket.on(opcode, listener);
    }

    public sendPacket(opcode: ServerToClientPacketOpcodes, ...data: any[]) {
        this.socket.emit(opcode, ...data);
    }
}
