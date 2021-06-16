import { IncomingPacketRegistry, OutgoingPacketRegistry, RegisterListenerFn, EmitFn } from "@shoki/networking";
import { EmitActionsPacket } from "@shoki/networking";
import { EmptyPacket } from "./empty-packet";

export enum PacketOpcodes {
	FINISH_MATCH = "finishMatch",

	SEND_PLAYER_ACTIONS = "sendPlayerActions"
}

export type PacketDefinitions = {
	[PacketOpcodes.FINISH_MATCH]: EmptyPacket;

	[PacketOpcodes.SEND_PLAYER_ACTIONS]: EmitActionsPacket;
};

export type PacketAcknowledgements = {
	[PacketOpcodes.FINISH_MATCH]: never;

	[PacketOpcodes.SEND_PLAYER_ACTIONS]: never;
};

export type IncomingRegistry = IncomingPacketRegistry<PacketDefinitions, PacketAcknowledgements>;
export type OutgoingRegistry = OutgoingPacketRegistry<PacketDefinitions, PacketAcknowledgements>;

export const createIncomingRegistry = (
	registerListener: RegisterListenerFn<PacketDefinitions, PacketAcknowledgements>
): IncomingRegistry =>
	new IncomingPacketRegistry<PacketDefinitions, PacketAcknowledgements>(registerListener);

export const createOutgoingRegistry = (
	emit: EmitFn<PacketDefinitions, PacketAcknowledgements>
): OutgoingRegistry =>
	new OutgoingPacketRegistry<PacketDefinitions, PacketAcknowledgements>(emit);
