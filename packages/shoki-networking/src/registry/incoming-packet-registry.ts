export type RegisterListenerFn<TPayloads, TAcknowledgements> = <TOpcode extends keyof TPayloads & keyof TAcknowledgements>(
	opcode: TOpcode,
	handler: (payload: TPayloads[TOpcode], ack?: TAcknowledgements[TOpcode]) => void
) => void;

export class IncomingPacketRegistry<TPayloads, TAcknowledgements> {
	public constructor(private registerListener: RegisterListenerFn<TPayloads, TAcknowledgements>) {

	}

	public on<TOpcode extends keyof TPayloads & keyof TAcknowledgements>(
		opcode: TOpcode,
		handler: (payload: TPayloads[TOpcode], ack?: TAcknowledgements[TOpcode]) => void
	) {
		this.registerListener(opcode, handler);
	}

	public off<TOpcode extends keyof TPayloads & keyof TAcknowledgements>(
		opcode: TOpcode,
		handler: (payload: TPayloads[TOpcode], ack?: TAcknowledgements[TOpcode]) => void
	) {
		// todo implement
	}
}