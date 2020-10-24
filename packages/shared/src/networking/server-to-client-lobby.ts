import * as Models from "@creature-chess/models";

type LobbyPlayerUpdatePacket = {
  index: number;
  player: Models.LobbyPlayer;
};

export enum ServerToClientLobbyPacketOpcodes {
  LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
}

export type ServerToClientLobbyPacketDefinitions = {
  [ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket,
};

export type ServerToClientLobbyPacketAcknowledgements = {
  [ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE]: never,
};
