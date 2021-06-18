import { PacketSet } from "./packet";
import { incoming } from "./registry/incoming";
import { outgoing } from "./registry/outgoing";

export const protocol = <TPackets extends PacketSet>() => ({
	outgoing: outgoing<TPackets>(),
	incoming: incoming<TPackets>()
});
