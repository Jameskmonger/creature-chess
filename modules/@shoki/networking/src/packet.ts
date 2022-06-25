export type Packet = {
	payload: any;
	ack: (...args: any[]) => void | never;
};

export type PacketSet = { [opcode: string]: Packet };

export type OpcodesForPacket<TPacketSet extends PacketSet, TPacket> = {
	[TOpcode in keyof TPacketSet]?: TPacketSet[TOpcode] extends TPacket
		? TPacketSet[TOpcode]
		: never;
};
