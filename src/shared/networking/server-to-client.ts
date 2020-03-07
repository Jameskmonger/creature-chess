import * as Models from "../models";
import { GamePhase } from "../game-phase";
import { FeedMessage } from "../feed-message";

type PreparingPhasePacket = {
  round: number;
  pieces: Models.Piece[];
  bench: Models.Piece[];
  cards: Models.Card[];
};

export type PhaseUpdatePacket =
  ({ phase: GamePhase.PREPARING, payload: PreparingPhasePacket })
  | ({ phase: GamePhase.READY, payload: { pieces: Models.Piece[], opponentId: string } })
  | ({ phase: GamePhase.PLAYING })
  | ({ phase: GamePhase.DEAD });

type LevelUpdatePacket = {
  level: number;
  xp: number;
};

type LobbyPlayerUpdatePacket = {
  index: number;
  player: Models.LobbyPlayer;
};

type StartGamePacket = {
  gameId: string;
  reconnectionSecret: string;
  localPlayerId: string;
  name: string;
};

type FinishGamePacket = {
  winnerName: string;
};

type ShopLockUpdatePacket = {
  locked: boolean;
};

export type ReconnectAuthenticateSuccessPacket = {
  reconnectSecret: string;
};

export type JoinLobbyResponse = {
  error?: string;
  response?: {
      playerId: string;
      lobbyId: string;
      players: Models.LobbyPlayer[];
      startTimestamp: number;
      isHost: boolean;
  };
};

export enum ServerToClientPacketOpcodes {
  CARDS_UPDATE = "cardsUpdate",
  PLAYER_LIST_UPDATE = "playerListUpdate",
  PHASE_UPDATE = "phaseUpdate",
  MONEY_UPDATE = "moneyUpdate",
  LEVEL_UPDATE = "levelUpdate",
  NEW_FEED_MESSAGE = "newFeedMessage",
  LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
  START_GAME = "startGame",
  FINISH_GAME = "finishGame",
  SHOP_LOCK_UPDATE = "shopLockUpdate",

  RECONNECT_AUTHENTICATE_SUCCESS = "reconnectAuthSuccess",
  RECONNECT_AUTHENTICATE_FAILURE = "reconnectAuthFailure"
}

export type ServerToClientPacketDefinitions = {
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: Models.Card[],
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: Models.PlayerListPlayer[],
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: PhaseUpdatePacket,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: number,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: LevelUpdatePacket,
  [ServerToClientPacketOpcodes.NEW_FEED_MESSAGE]: FeedMessage,
  [ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket,
  [ServerToClientPacketOpcodes.START_GAME]: StartGamePacket,
  [ServerToClientPacketOpcodes.FINISH_GAME]: FinishGamePacket,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: ShopLockUpdatePacket,
  [ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_SUCCESS]: ReconnectAuthenticateSuccessPacket,
  [ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_FAILURE]: undefined
};

export type ServerToClientPacketAcknowledgements = {
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: never,
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: never,
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: never,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: never,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: never,
  [ServerToClientPacketOpcodes.NEW_FEED_MESSAGE]: never,
  [ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE]: never,
  [ServerToClientPacketOpcodes.START_GAME]: never,
  [ServerToClientPacketOpcodes.FINISH_GAME]: never,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: never,
  [ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_SUCCESS]: never,
  [ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_FAILURE]: never
};
