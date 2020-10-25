import { PlayerAction } from "../game/player/actions";
import { EmptyPacket } from "./empty-packet";

export enum ClientToServerPacketOpcodes {
  FINISH_MATCH = "finishMatch",
  SEND_PLAYER_ACTIONS = "sendPlayerActions"
}

export type SendPlayerActionsPacket = {
  index: number;
  actions: PlayerAction[];
};

export const SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS = 300;

export type ClientToServerPacketDefinitions = {
  [ClientToServerPacketOpcodes.FINISH_MATCH]: EmptyPacket,
  [ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS]: SendPlayerActionsPacket
};

export type ClientToServerPacketAcknowledgements = {
  [ClientToServerPacketOpcodes.FINISH_MATCH]: never,
  [ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS]: never
};
