type RegisterListenerFn<TPayloads, TAcknowledgements> = <TOpcode extends keyof TPayloads & keyof TAcknowledgements>(
  opcode: TOpcode,
  handler: (payload: TPayloads[TOpcode], ack?: TAcknowledgements[TOpcode]) => void
) => void;

export class IncomingPacketRegistry<TPayloads, TAcknowledgements> {
  constructor(private registerListener: RegisterListenerFn<TPayloads, TAcknowledgements>) {

  }

  public on<TOpcode extends keyof TPayloads & keyof TAcknowledgements>(
    opcode: TOpcode,
    handler: (payload: TPayloads[TOpcode], ack?: TAcknowledgements[TOpcode]) => void
  ) {
    this.registerListener(opcode, handler);
  }
}
