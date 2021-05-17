import { IncomingPacketRegistry, OutgoingPacketRegistry, RegisterListenerFn, EmitFn } from "@shoki/networking";
import { emitActionsOpcode, EmitActionsPacket } from "@shoki/networking";
import { EmptyPacket } from "./empty-packet";

export enum PacketOpcodes {
	FINISH_MATCH = "finishMatch"
}

export type PacketDefinitions = {
	[PacketOpcodes.FINISH_MATCH]: EmptyPacket;
	[emitActionsOpcode]: EmitActionsPacket;
};

export type PacketAcknowledgements = {
	[PacketOpcodes.FINISH_MATCH]: never;
	[emitActionsOpcode]: never;
};

export type IncomingRegistry = IncomingPacketRegistry<
	PacketDefinitions, PacketAcknowledgements
>;
export type OutgoingRegistry = OutgoingPacketRegistry<
	PacketDefinitions, PacketAcknowledgements
>;

export const createIncomingRegistry = (
	registerListener: RegisterListenerFn<PacketDefinitions, PacketAcknowledgements>
): IncomingRegistry =>
	new IncomingPacketRegistry<PacketDefinitions, PacketAcknowledgements>(registerListener);

export const createOutgoingRegistry = (
	emit: EmitFn<PacketDefinitions, PacketAcknowledgements>
): OutgoingRegistry =>
	new OutgoingPacketRegistry<PacketDefinitions, PacketAcknowledgements>(emit);
