import * as Models from "@creature-chess/models";

type LobbyConnectionPacket = {
    playerId: string;
    lobbyId: string;
    players: Models.LobbyPlayer[];
    startTimestamp: number;
};

export enum ServerToClientMenuPacketOpcodes {
  LOBBY_CONNECTED = "lobbyConnected"
}

export type ServerToClientMenuPacketDefinitions = {
  [ServerToClientMenuPacketOpcodes.LOBBY_CONNECTED]: LobbyConnectionPacket
};

export type ServerToClientMenuPacketAcknowledgements = {
  [ServerToClientMenuPacketOpcodes.LOBBY_CONNECTED]: never
};
