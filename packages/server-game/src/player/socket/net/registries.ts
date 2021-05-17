import { getContext, setContext } from "typed-redux-saga";
import { ClientToServer, ServerToClient } from "@creature-chess/networking";

export type PlayerRegistries = {
	incoming: ClientToServer.IncomingRegistry;
	outgoing: ServerToClient.Game.OutgoingRegistry;
};

export const getPacketRegistries = () => getContext<PlayerRegistries>("packetRegistries");
export const setPacketRegistries = (
	packetRegistries: PlayerRegistries | null
) => setContext<{ packetRegistries: PlayerRegistries | null }>({ packetRegistries });
