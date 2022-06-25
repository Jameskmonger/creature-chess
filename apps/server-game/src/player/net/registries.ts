import { getContext, setContext } from "typed-redux-saga";

import { IncomingRegistry, OutgoingRegistry } from "@shoki/networking";

import { ClientToServer, GameServerToClient } from "@creature-chess/networking";

export type PlayerRegistries = {
	incoming: IncomingRegistry<ClientToServer.PacketSet>;
	outgoing: OutgoingRegistry<GameServerToClient.PacketSet>;
};

export const getPacketRegistries = () =>
	getContext<PlayerRegistries>("packetRegistries");
export const setPacketRegistries = (
	packetRegistries: PlayerRegistries | null
) =>
	setContext<{ packetRegistries: PlayerRegistries | null }>({
		packetRegistries,
	});
