import * as Models from "@creature-chess/models";
import { BoardState } from "../board";
import { GamePhase } from "@creature-chess/models";
import { BenchState } from "../player/bench";
import { IndexedPieces } from "@creature-chess/models/src/piece";

export type PreparingPhaseUpdatePacket = {
  startedAtSeconds: number,
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
  startedAtSeconds: number,
  phase: GamePhase.READY,
  payload: {
    board: BoardState;
    bench: BenchState;
    opponentId: string
  }
};

type PlayingPhaseUpdatePacket = ({ startedAtSeconds: number, phase: GamePhase.PLAYING });
type DeadPhaseUpdatePacket = ({ startedAtSeconds: number, phase: GamePhase.DEAD });

export type PhaseUpdatePacket =
  PreparingPhaseUpdatePacket
  | ReadyPhaseUpdatePacket
  | PlayingPhaseUpdatePacket
  | DeadPhaseUpdatePacket;

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
  error?: { type: "nickname_required" } | { type: "invalid_nickname", error: string } | { type: "authentication" };
};

export type PlayerGameState = {
  id: string;

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
  FINISH_GAME = "finishGame",
  SHOP_LOCK_UPDATE = "shopLockUpdate",
  PLAYERS_RESURRECTED = "playersResurrected",
}

export type ServerToClientPacketDefinitions = {
  [ServerToClientPacketOpcodes.JOIN_GAME]: PlayerGameState,
  [ServerToClientPacketOpcodes.CARDS_UPDATE]: Models.Card[],
  [ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE]: Models.PlayerListPlayer[],
  [ServerToClientPacketOpcodes.PHASE_UPDATE]: PhaseUpdatePacket,
  [ServerToClientPacketOpcodes.MONEY_UPDATE]: number,
  [ServerToClientPacketOpcodes.LEVEL_UPDATE]: LevelUpdatePacket,
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
  [ServerToClientPacketOpcodes.FINISH_GAME]: never,
  [ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE]: never,
  [ServerToClientPacketOpcodes.PLAYERS_RESURRECTED]: never
};
