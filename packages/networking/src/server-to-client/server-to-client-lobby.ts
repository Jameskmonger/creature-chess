import * as Models from "@creature-chess/models";
import { EmptyPacket } from "../empty-packet";

type LobbyPlayerUpdatePacket = {
	index: number;
	player: Models.LobbyPlayer;
};

export enum PacketOpcodes {
	LOBBY_GAME_STARTED = "lobbyGameStarted",
	LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
}

export type PacketDefinitions = {
	[PacketOpcodes.LOBBY_GAME_STARTED]: EmptyPacket,
	[PacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket,
};

export type PacketAcknowledgements = {
	[PacketOpcodes.LOBBY_GAME_STARTED]: never,
	[PacketOpcodes.LOBBY_PLAYER_UPDATE]: never,
};
