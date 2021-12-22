import { protocol as shokiProtocol } from "@shoki/networking";
import { LobbyPlayer } from "@creature-chess/models";
import { EmptyPacket } from "../empty-packet";

export type LobbyConnectionPacket = {
	players: LobbyPlayer[];
	startTimestamp: number;
};

type LobbyPlayerUpdatePacket = {
	index: number;
	player: LobbyPlayer;
};

export type PacketSet = {
	connected: {
		payload: LobbyConnectionPacket;
		ack: never;
	};
	gameStarted: {
		payload: EmptyPacket;
		ack: never;
	};
	lobbyPlayerUpdate: {
		payload: LobbyPlayerUpdatePacket;
		ack: never;
	};
};

export const { incoming, outgoing } = shokiProtocol<PacketSet>();
