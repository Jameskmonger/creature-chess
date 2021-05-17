import { getContext, setContext } from "typed-redux-saga";
import { ClientToServer, IncomingPacketRegistry, OutgoingPacketRegistry, ServerToClient } from "@creature-chess/networking";

export type OutgoingRegistry = OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>;
export type IncomingRegistry = IncomingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>;

export type PlayerRegistries = {
	incoming: IncomingRegistry;
	outgoing: OutgoingRegistry;
};

export const getPacketRegistries = () => getContext<PlayerRegistries>("packetRegistries");
export const setPacketRegistries = (
	packetRegistries: PlayerRegistries | null
) => setContext<{ packetRegistries: PlayerRegistries | null }>({ packetRegistries });
