import { FindGameResponse } from "./server-to-client";
import { PlayerAction } from "@common/player/actions";

export enum ClientToServerPacketOpcodes {
  FIND_GAME = "findGame",
  FINISH_MATCH = "finishMatch",
  START_LOBBY_GAME = "startLobbyGame",
  RECONNECT_AUTHENTICATE = "reconnectAuthenticate",
  SEND_PLAYER_ACTIONS = "sendPlayerActions"
}

export type ReconnectAuthenticatePacket = {
  playerId: string;
  gameId: string;
  reconnectSecret: string;
};

export type SendPlayerActionsPacket = {
  index: number;
  actions: PlayerAction[];
};

export const SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS = 300;

type EmptyPacket = { empty: true };

export type ClientToServerPacketDefinitions = {
  [ClientToServerPacketOpcodes.FIND_GAME]: EmptyPacket,
  [ClientToServerPacketOpcodes.FINISH_MATCH]: EmptyPacket,
  [ClientToServerPacketOpcodes.START_LOBBY_GAME]: EmptyPacket,
  [ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE]: ReconnectAuthenticatePacket,
  [ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS]: SendPlayerActionsPacket
};

export type ClientToServerPacketAcknowledgements = {
  [ClientToServerPacketOpcodes.FIND_GAME]: (response: FindGameResponse) => void,
  [ClientToServerPacketOpcodes.FINISH_MATCH]: never,
  [ClientToServerPacketOpcodes.START_LOBBY_GAME]: never,
  [ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE]: never,
  [ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS]: (accepted: boolean, packetIndex?: number) => void
};
