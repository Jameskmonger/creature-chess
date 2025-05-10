export type Action<T = any> = { type: T };

/**
 * The packet used to emit a set of actions.
 */
export type ActionStreamPacket = {
	payload: Action;
	ack: never;
};
