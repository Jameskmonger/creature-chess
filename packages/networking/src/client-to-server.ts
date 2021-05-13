import { PlayerGameActions } from "@creature-chess/gamemode";
import { EmptyPacket } from "./empty-packet";

export enum PacketOpcodes {
	FINISH_MATCH = "finishMatch",
	SEND_PLAYER_ACTIONS = "sendPlayerActions"
}

export type SendPlayerActionsPacket = {
	index: number;
	actions: PlayerGameActions.PlayerGameAction[];
};

export type PacketDefinitions = {
	[PacketOpcodes.FINISH_MATCH]: EmptyPacket,
	[PacketOpcodes.SEND_PLAYER_ACTIONS]: SendPlayerActionsPacket
};

export type PacketAcknowledgements = {
	[PacketOpcodes.FINISH_MATCH]: never,
	[PacketOpcodes.SEND_PLAYER_ACTIONS]: never
};
