import { emitActionsOpcode, EmitActionsPacket } from "./registry/emitActions";
import { EmptyPacket } from "./empty-packet";

export enum PacketOpcodes {
	FINISH_MATCH = "finishMatch"
}

export type PacketDefinitions = {
	[PacketOpcodes.FINISH_MATCH]: EmptyPacket,
	[emitActionsOpcode]: EmitActionsPacket
};

export type PacketAcknowledgements = {
	[PacketOpcodes.FINISH_MATCH]: never,
	[emitActionsOpcode]: never
};
