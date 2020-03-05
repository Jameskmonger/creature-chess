type RegisterListenerFn<TPayloads> = <TOpcode extends keyof TPayloads>(
  opcode: TOpcode,
  handler: (payload: TPayloads[TOpcode]) => void
) => void;

export class IncomingPacketRegistry<TPayloads> {
  constructor(private registerListener: RegisterListenerFn<TPayloads>) {

  }

  public on<TOpcode extends keyof TPayloads>(
    opcode: TOpcode,
    handler: (payload: TPayloads[TOpcode]) => void
  ) {
    this.registerListener(opcode, handler);
  }
}
