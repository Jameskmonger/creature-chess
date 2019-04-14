import { SEND_PACKET } from "../actiontypes/networkActionTypes";

export type NetworkAction = ({ type: SEND_PACKET, payload: { opcode: string, data: any } });

export const sendPacket = (opcode: string, data: any) => ({
    type: SEND_PACKET,
    payload: {
        opcode,
        data
    }
});
