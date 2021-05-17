import * as Models from "@creature-chess/models";
import { EmptyPacket } from "../empty-packet";

export type LobbyConnectionPacket = {
	lobbyId: string;
	players: Models.LobbyPlayer[];
	startTimestamp: number;
};

type LobbyPlayerUpdatePacket = {
	index: number;
	player: Models.LobbyPlayer;
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
