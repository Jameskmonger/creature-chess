export type Action<T = any> = { type: T };

export type ActionStreamPayload = {
	index: number;
	actions: Action[];
};

/**
 * The packet used to emit a set of actions.
 */
export type ActionStreamPacket = {
	payload: ActionStreamPayload;
	ack: never;
};
