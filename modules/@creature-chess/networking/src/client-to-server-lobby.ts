import { protocol as shokiProtocol } from "@shoki/networking";

import { EmptyPacket } from "./empty-packet";

export type PacketSet = {
	startNow: {
		payload: EmptyPacket;
		ack: never;
	};
};

export const { incoming, outgoing } = shokiProtocol<PacketSet>();
