type EmitFn <TPayloads, TAcknowledgements> = <TOpcode extends keyof TPayloads & keyof TAcknowledgements>(
  opcode: TOpcode,
  payload: TPayloads[TOpcode],
  ack?: (response: TAcknowledgements[TOpcode]) => void
) => void;

export class OutgoingPacketRegistry<TPayloads, TAcknowledgements> {
  constructor(private emitFn: EmitFn<TPayloads, TAcknowledgements>) {

  }

  public emit<TKey extends keyof TPayloads & keyof TAcknowledgements>(
    opcode: TKey,
    payload?: TPayloads[TKey],
    ack?: (response: TAcknowledgements[TKey]) => void
  ) {
    if (ack) {
      this.emitFn(opcode, payload, ack);
    } else {
      this.emitFn(opcode, payload);
    }
  }
}
