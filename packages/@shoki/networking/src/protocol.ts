import { PacketSet } from "./packet";
import { incoming, IncomingRegistry, RegisterHandlerFn } from "./registry/incoming";
import { outgoing, OutgoingRegistry, EmitFn } from "./registry/outgoing";

type OutgoingRegistryFactory<TPackets extends PacketSet> = (emit: EmitFn<TPackets>) => OutgoingRegistry<TPackets>;
type IncomingRegistryFactory<TPackets extends PacketSet>
	= (register: RegisterHandlerFn<TPackets>, unregister: RegisterHandlerFn<TPackets>) => IncomingRegistry<TPackets>;

type ShokiProtocol<TPackets extends PacketSet> = {
	outgoing: OutgoingRegistryFactory<TPackets>;
	incoming: IncomingRegistryFactory<TPackets>;
};

export const protocol = <TPackets extends PacketSet>(): ShokiProtocol<TPackets> => ({
	outgoing: outgoing<TPackets>(),
	incoming: incoming<TPackets>()
});
