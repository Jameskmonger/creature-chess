import { protocol as shokiProtocol } from "@shoki/networking";

import { LobbyPlayer } from "@creature-chess/models/lobby";
import { GamemodeSettings } from "@creature-chess/models/settings";

/**
 * TODO this code is duplicated in @cc-web, see LobbyPageContext
 */
export type LobbyConnectionPacket = {
	players: LobbyPlayer[];
	startTimestamp: number;
	maxPlayers: number;
	lobbyWaitTimeSeconds: number;
	settings: GamemodeSettings;
};

export type LobbyUpdatePacket = {
	players: LobbyPlayer[];
};

export type LobbySettingsUpdatePacket = {
	settings: GamemodeSettings;
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
	settingsUpdate: {
		payload: LobbySettingsUpdatePacket;
		ack: never;
	};
};

export const { incoming, outgoing } = shokiProtocol<PacketSet>();
