import { PacketSet } from "../packet";

export type EmitFn<TPackets extends PacketSet> = <
	TOpcode extends keyof TPackets,
>(
	opcode: TOpcode,
	payload: TPackets[TOpcode]["payload"],
	ack?: TPackets[TOpcode]["ack"]
) => void;

export type OutgoingRegistry<TPackets extends PacketSet> = {
	send: EmitFn<TPackets>;
};

export const outgoing =
	<TPackets extends PacketSet>() =>
	(emit: EmitFn<TPackets>): OutgoingRegistry<TPackets> => ({
		send: emit,
	});
