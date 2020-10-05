import * as Models from "@creature-chess/models";
import { BoardState } from "../board";
import { GamePhase } from "@creature-chess/models";
import { BenchState } from "../player/bench";
import { IndexedPieces } from "@creature-chess/models/src/piece";

export type PreparingPhaseUpdatePacket = {
  startedAt: number,
  phase: GamePhase.PREPARING,
  payload:
  {
    round: number;
    pieces: {
      board: BoardState;
      bench: BenchState;
    };
    cards: Models.Card[];
  }
};

export type ReadyPhaseUpdatePacket = {
  startedAt: number,
  phase: GamePhase.READY,
  payload: {
    board: BoardState;
    bench: BenchState;
    opponentId: string
  }
};

export type PhaseUpdatePacket =
  PreparingPhaseUpdatePacket
  | ReadyPhaseUpdatePacket
  | ({ startedAt: number, phase: GamePhase.PLAYING })
  | ({ startedAt: number, phase: GamePhase.DEAD });

type LevelUpdatePacket = {
  level: number;
  xp: number;
};

type LobbyPlayerUpdatePacket = {
  index: number;
  player: Models.LobbyPlayer;
};

type FinishGamePacket = {
  winnerName: string;
};

type ShopLockUpdatePacket = {
  locked: boolean;
};

export type AuthenticateResponse = {
  error?: { type: "nickname_required" } | { type: "invalid_nickname", error: string } | { type: "authentication" };
};

export type PlayerGameState = {
  localPlayerId: string;

  // todo get rid of the ones above
  fullState?: {
    board: IndexedPieces;
    bench: BenchState;
    players: Models.PlayerListPlayer[];
    level: {
      level: number;
      xp: number;
    };
    cards: Models.Card[];
    money: number;

    phase: PhaseUpdatePacket;
  }
};

export type JoinGamePacket = {
  type: "lobby",
  payload: {
    playerId: string;
    lobbyId: string;
    players: Models.LobbyPlayer[];
    startTimestamp: number;
  }
} | {
  type: "game",
  payload: PlayerGameState
};

type PlayersResurrectedPacket = {
  playerIds: string[];
};

export enum ServerToClientPacketOpcodes {
  JOIN_GAME = "joinGame",
  CARDS_UPDATE = "cardsUpdate",
  PLAYER_LIST_UPDATE = "playerListUpdate",
  PHASE_UPDATE = "phaseUpdate",
  MONEY_UPDATE = "moneyUpdate",
  LEVEL_UPDATE = "levelUpdate",
  LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
  FINISH_GAME = "finishGame",
  SHOP_LOCK_UPDATE = "shopLockUpdate",
  PLAYERS_RESURRECTED = "playersResurrected",
}

export type ServerToClientPacketDefinitions = {
  [ServerToClientPacketOpcodes.JOIN_GAME]: JoinGamePacket,
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: Models.Card[],
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: Models.PlayerListPlayer[],
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: PhaseUpdatePacket,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: number,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: LevelUpdatePacket,
  [ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE]: LobbyPlayerUpdatePacket,
  [ServerToClientPacketOpcodes.FINISH_GAME]: FinishGamePacket,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: ShopLockUpdatePacket,
  [ServerToClientPacketOpcodes.PLAYERS_RESURRECTED]: PlayersResurrectedPacket,
};

export type ServerToClientPacketAcknowledgements = {
  [ServerToClientPacketOpcodes.JOIN_GAME]: never,
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: never,
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: never,
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: never,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: never,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: never,
  [ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE]: never,
  [ServerToClientPacketOpcodes.FINISH_GAME]: never,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: never,
  [ServerToClientPacketOpcodes.PLAYERS_RESURRECTED]: never
};
