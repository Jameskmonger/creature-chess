import { Packet, PacketSet } from "../packet";

export type HandlerFn<T extends Packet> = (payload: T["payload"], ack?: T["ack"]) => void;

export type RegisterHandlerFn<TPackets extends PacketSet> = <TOpcode extends keyof TPackets>(
	opcode: TOpcode,
	handler: HandlerFn<TPackets[TOpcode]>
) => void;

export type IncomingRegistry<TPackets extends PacketSet> = {
	on: RegisterHandlerFn<TPackets>;
	off: RegisterHandlerFn<TPackets>;
};

export const incoming = <TPackets extends PacketSet>() => (
	register: RegisterHandlerFn<TPackets>,
	unregister: RegisterHandlerFn<TPackets>
): IncomingRegistry<TPackets> => ({
	on: register,
	off: unregister
});
