import * as Models from "@creature-chess/models";

export type JoinLobbyPacket = {
    playerId: string;
    lobbyId: string;
    players: Models.LobbyPlayer[];
    startTimestamp: number;
};

type LobbyPlayerUpdatePacket = {
  index: number;
  player: Models.LobbyPlayer;
};

export enum ServerToClientLobbyPacketOpcodes {
  JOIN_LOBBY = "joinLobby",
  LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
}

export type ServerToClientLobbyPacketDefinitions = {
  [ServerToClientLobbyPacketOpcodes.JOIN_LOBBY]: JoinLobbyPacket,
  [ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket,
};

export type ServerToClientLobbyPacketAcknowledgements = {
  [ServerToClientLobbyPacketOpcodes.JOIN_LOBBY]: never,
  [ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE]: never,
};
