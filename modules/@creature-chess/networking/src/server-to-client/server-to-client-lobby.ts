import { LobbyPlayer } from "@creature-chess/models/lobby";
import { GamemodeSettings } from "@creature-chess/models/settings";

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

export type Events = {
	connected: (payload: LobbyConnectionPacket) => void;
	lobbyUpdate: (payload: LobbyUpdatePacket) => void;
	settingsUpdate: (payload: LobbySettingsUpdatePacket) => void;
};
