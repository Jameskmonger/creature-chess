import { PlayerAction } from "../player/actions";

export enum ClientToServerPacketOpcodes {
  FINISH_MATCH = "finishMatch",
  SEND_PLAYER_ACTIONS = "sendPlayerActions"
}

export type SendPlayerActionsPacket = {
  index: number;
  actions: PlayerAction[];
};

export const SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS = 300;

export type EmptyPacket = { empty: true };

export type ClientToServerPacketDefinitions = {
  [ClientToServerPacketOpcodes.FINISH_MATCH]: EmptyPacket,
  [ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS]: SendPlayerActionsPacket
};

export type ClientToServerPacketAcknowledgements = {
  [ClientToServerPacketOpcodes.FINISH_MATCH]: never,
  [ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS]: (accepted: boolean, packetIndex?: number) => void
};
