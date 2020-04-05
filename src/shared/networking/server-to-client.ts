import * as Models from "@common/models";
import { BoardState } from "@common/board";
import { PlayerPiecesState } from "@common/player";
import { GamePhase } from "@common/models";

export type PreparingPhaseUpdatePacket = {
  phase: GamePhase.PREPARING,
  payload:
  {
    round: number;
    pieces: PlayerPiecesState;
    cards: Models.Card[];
  }
};

export type ReadyPhaseUpdatePacket = {
  phase: GamePhase.READY,
  payload: {
    board: BoardState;
    opponentId: string
  }
};

export type PhaseUpdatePacket =
  PreparingPhaseUpdatePacket
  | ReadyPhaseUpdatePacket
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

type PlayersResurrectedPacket = {
  playerIds: string[];
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
  PLAYERS_RESURRECTED = "playersResurrected",

  RECONNECT_AUTHENTICATE_SUCCESS = "reconnectAuthSuccess",
  RECONNECT_AUTHENTICATE_FAILURE = "reconnectAuthFailure"
}

export type ServerToClientPacketDefinitions = {
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: Models.Card[],
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: Models.PlayerListPlayer[],
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: PhaseUpdatePacket,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: number,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: LevelUpdatePacket,
  [ServerToClientPacketOpcodes.NEW_FEED_MESSAGE]: Models.FeedMessage,
  [ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket,
  [ServerToClientPacketOpcodes.START_GAME]: StartGamePacket,
  [ServerToClientPacketOpcodes.FINISH_GAME]: FinishGamePacket,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: ShopLockUpdatePacket,
  [ServerToClientPacketOpcodes.PLAYERS_RESURRECTED]: PlayersResurrectedPacket,
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
  [ServerToClientPacketOpcodes.PLAYERS_RESURRECTED]: never,
  [ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_SUCCESS]: never,
  [ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_FAILURE]: never
};
