import { protocol as shokiProtocol } from "@shoki/networking";

import { LobbyPlayer } from "@creature-chess/models";

/**
 * TODO this code is duplicated in @cc-web, see LobbyPageContext
 */
export type LobbyConnectionPacket = {
	players: LobbyPlayer[];
	startTimestamp: number;
	maxPlayers: number;
	lobbyWaitTimeSeconds: number;
};

export type LobbyUpdatePacket = {
	players: LobbyPlayer[];
};

export type PacketSet = {
	connected: {
		payload: LobbyConnectionPacket;
		ack: never;
	};
	lobbyUpdate: {
		payload: LobbyUpdatePacket;
		ack: never;
	};
};

export const { incoming, outgoing } = shokiProtocol<PacketSet>();
