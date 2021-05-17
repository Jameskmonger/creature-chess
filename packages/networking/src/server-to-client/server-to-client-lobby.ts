import { IncomingPacketRegistry, OutgoingPacketRegistry, RegisterListenerFn, EmitFn } from "@shoki/networking";
import { LobbyPlayer } from "@creature-chess/models";
import { EmptyPacket } from "../empty-packet";

export type LobbyConnectionPacket = {
	lobbyId: string;
	players: LobbyPlayer[];
	startTimestamp: number;
};

type LobbyPlayerUpdatePacket = {
	index: number;
	player: LobbyPlayer;
};

export enum PacketOpcodes {
	LOBBY_CONNECTED = "lobbyConnected",
	LOBBY_GAME_STARTED = "lobbyGameStarted",
	LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
}

export type PacketDefinitions = {
	[PacketOpcodes.LOBBY_CONNECTED]: LobbyConnectionPacket;
	[PacketOpcodes.LOBBY_GAME_STARTED]: EmptyPacket;
	[PacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket;
};

export type PacketAcknowledgements = {
	[PacketOpcodes.LOBBY_CONNECTED]: never;
	[PacketOpcodes.LOBBY_GAME_STARTED]: never;
	[PacketOpcodes.LOBBY_PLAYER_UPDATE]: never;
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
