import { Card, GamePhase, IndexedPieces, PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { BoardState } from "../board";
import { BenchState } from "../game/player/bench";
import { EmptyPacket } from "./empty-packet";

export type PreparingPhaseUpdatePacket = {
  startedAtSeconds: number,
  phase: GamePhase.PREPARING,
  payload: {
    round: number;
    pieces: {
      board: BoardState;
      bench: BenchState;
    };
    cards: Card[];
  }
};

export type ReadyPhaseUpdatePacket = {
  startedAtSeconds: number,
  phase: GamePhase.READY,
  payload: {
    board: BoardState;
    bench: BenchState;
    opponentId: string
  }
};

type PlayingPhaseUpdatePacket = ({ startedAtSeconds: number, phase: GamePhase.PLAYING });

export type PhaseUpdatePacket =
  PreparingPhaseUpdatePacket
  | ReadyPhaseUpdatePacket
  | PlayingPhaseUpdatePacket;

type LevelUpdatePacket = {
  level: number;
  xp: number;
};

type FinishGamePacket = {
  winnerName: string;
};

type ShopLockUpdatePacket = {
  locked: boolean;
};

export type AuthenticateResponse = {
  error?: { type: "not_registered" } | { type: "authentication" };
};

type PlayersResurrectedPacket = {
  playerIds: string[];
};

type MatchRewardsPacket = {
  damage: number;
  justDied: boolean;
  rewardMoney: { total: number, base: number, winBonus: number, streakBonus: number, interest: number };
};

type BenchUpdatePacket = {
  benchPieces: PieceModel[]
};

type BoardUpdatePacket = {
  boardPieces: IndexedPieces
};

export enum ServerToClientPacketOpcodes {
  BENCH_UPDATE = "benchUpdate",
  BOARD_UPDATE = "boardUpdate",
  CARDS_UPDATE = "cardsUpdate",
  PLAYER_LIST_UPDATE = "playerListUpdate",
  PHASE_UPDATE = "phaseUpdate",
  MONEY_UPDATE = "moneyUpdate",
  LEVEL_UPDATE = "levelUpdate",
  FINISH_GAME = "finishGame",
  SHOP_LOCK_UPDATE = "shopLockUpdate",
  PLAYERS_RESURRECTED = "playersResurrected",
  MATCH_REWARDS = "matchRewards",
  PLAYER_DEAD = "playerDead"
}

export type ServerToClientPacketDefinitions = {
  [ServerToClientPacketOpcodes.BENCH_UPDATE]: BenchUpdatePacket,
  [ServerToClientPacketOpcodes.BOARD_UPDATE]: BoardUpdatePacket,
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: Card[],
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: PlayerListPlayer[],
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: PhaseUpdatePacket,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: number,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: LevelUpdatePacket,
  [ServerToClientPacketOpcodes.FINISH_GAME]: FinishGamePacket,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: ShopLockUpdatePacket,
  [ServerToClientPacketOpcodes.PLAYERS_RESURRECTED]: PlayersResurrectedPacket,
  [ServerToClientPacketOpcodes.MATCH_REWARDS]: MatchRewardsPacket,
  [ServerToClientPacketOpcodes.PLAYER_DEAD]: EmptyPacket,
};

export type ServerToClientPacketAcknowledgements = {
  [ServerToClientPacketOpcodes.BENCH_UPDATE]: never,
  [ServerToClientPacketOpcodes.BOARD_UPDATE]: never,
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: never,
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: never,
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: never,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: never,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: never,
  [ServerToClientPacketOpcodes.FINISH_GAME]: never,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: never,
  [ServerToClientPacketOpcodes.PLAYERS_RESURRECTED]: never,
  [ServerToClientPacketOpcodes.MATCH_REWARDS]: never,
  [ServerToClientPacketOpcodes.PLAYER_DEAD]: never,
};
