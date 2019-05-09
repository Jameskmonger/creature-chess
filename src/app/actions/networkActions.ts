import { SEND_PACKET } from "../actiontypes/networkActionTypes";
import { ClientToServerPacketOpcodes } from "@common/packet-opcodes";

export type NetworkAction = ({ type: SEND_PACKET, payload: { opcode: ClientToServerPacketOpcodes, data?: any } });

export const sendPacket = (opcode: ClientToServerPacketOpcodes, ...data: any[]) => ({
    type: SEND_PACKET,
    payload: {
        opcode,
        data
    }
});
