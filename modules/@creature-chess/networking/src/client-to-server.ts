import { EmptyPacket } from "./empty-packet";

type ActionStreamPacket = {
	type: string;
	payload?: any;
};

export type Events = {
	finishMatch: (payload: EmptyPacket) => void;
	sendPlayerActions: (payload: ActionStreamPacket, ack: () => void) => void;
	ping: (payload: EmptyPacket, ack: () => void) => void;
};
