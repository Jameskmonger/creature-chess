import { ActionStream, protocol as shokiProtocol } from "@shoki/networking";

import { EmptyPacket } from "./empty-packet";

export type PacketSet = {
	finishMatch: {
		payload: EmptyPacket;
		ack: never;
	};

	sendPlayerActions: {
		payload: ActionStream.ActionStreamPacket;
		ack: never;
	};
};

export const { incoming, outgoing } = shokiProtocol<PacketSet>();
