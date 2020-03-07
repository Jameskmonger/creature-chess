import { JoinLobbyResponse } from "./server-to-client";
import { TileCoordinates } from "../position";

export enum ClientToServerPacketOpcodes {
  FIND_GAME = "findGame",
  JOIN_GAME = "joinGame",
  CREATE_GAME = "createGame",
  BUY_CARD = "buyCard",
  SELL_PIECE = "sellPiece",
  BUY_REROLL = "rerollCards",
  MOVE_PIECE_TO_BENCH = "movePieceToBench",
  MOVE_PIECE_TO_BOARD = "movePieceToBoard",
  BUY_XP = "buyXp",
  SEND_CHAT_MESSAGE = "sendChatMessage",
  FINISH_MATCH = "finishMatch",
  READY_UP = "readyUp",
  START_LOBBY_GAME = "startLobbyGame",
  TOGGLE_SHOP_LOCK = "toggleShopLock",
  RECONNECT_AUTHENTICATE = "reconnectAuthenticate"
}

export type MovePiecePacket = {
  id: string;
  from: TileCoordinates;
  to: TileCoordinates;
};

export type ReconnectAuthenticatePacket = {
  playerId: string;
  gameId: string;
  reconnectSecret: string;
};

export type JoinGamePacket = { name: string, gameId: string };

type EmptyPacket = { empty: true };

export type ClientToServerPacketDefinitions = {
  [ClientToServerPacketOpcodes.FIND_GAME]: string,
  [ClientToServerPacketOpcodes.JOIN_GAME]: JoinGamePacket,
  [ClientToServerPacketOpcodes.CREATE_GAME]: string,
  [ClientToServerPacketOpcodes.FINISH_MATCH]: EmptyPacket,
  [ClientToServerPacketOpcodes.BUY_REROLL]: EmptyPacket,
  [ClientToServerPacketOpcodes.BUY_XP]: EmptyPacket,
  [ClientToServerPacketOpcodes.READY_UP]: EmptyPacket,
  [ClientToServerPacketOpcodes.BUY_CARD]: number,
  [ClientToServerPacketOpcodes.SELL_PIECE]: string,
  [ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD]: MovePiecePacket,
  [ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH]: MovePiecePacket,
  [ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE]: string,
  [ClientToServerPacketOpcodes.START_LOBBY_GAME]: EmptyPacket,
  [ClientToServerPacketOpcodes.TOGGLE_SHOP_LOCK]: EmptyPacket,
  [ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE]: ReconnectAuthenticatePacket
};

export type ClientToServerPacketAcknowledgements = {
  [ClientToServerPacketOpcodes.FIND_GAME]: JoinLobbyResponse,
  [ClientToServerPacketOpcodes.JOIN_GAME]: JoinLobbyResponse,
  [ClientToServerPacketOpcodes.CREATE_GAME]: JoinLobbyResponse,
  [ClientToServerPacketOpcodes.FINISH_MATCH]: never,
  [ClientToServerPacketOpcodes.BUY_REROLL]: never,
  [ClientToServerPacketOpcodes.BUY_XP]: never,
  [ClientToServerPacketOpcodes.READY_UP]: never,
  [ClientToServerPacketOpcodes.BUY_CARD]: never,
  [ClientToServerPacketOpcodes.SELL_PIECE]: never,
  [ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD]: never,
  [ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH]: never,
  [ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE]: never,
  [ClientToServerPacketOpcodes.START_LOBBY_GAME]: never,
  [ClientToServerPacketOpcodes.TOGGLE_SHOP_LOCK]: never,
  [ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE]: never
};
