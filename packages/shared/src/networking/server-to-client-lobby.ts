import * as Models from "@creature-chess/models";
import { EmptyPacket } from "./empty-packet";

type LobbyPlayerUpdatePacket = {
  index: number;
  player: Models.LobbyPlayer;
};

export enum ServerToClientLobbyPacketOpcodes {
  LOBBY_GAME_STARTED = "lobbyGameStarted",
  LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
}

export type ServerToClientLobbyPacketDefinitions = {
  [ServerToClientLobbyPacketOpcodes.LOBBY_GAME_STARTED]: EmptyPacket,
  [ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket,
};

export type ServerToClientLobbyPacketAcknowledgements = {
  [ServerToClientLobbyPacketOpcodes.LOBBY_GAME_STARTED]: never,
  [ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE]: never,
};
