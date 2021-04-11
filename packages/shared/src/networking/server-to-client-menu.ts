import * as Models from "@creature-chess/models";
import { BoardState } from "@creature-chess/board";

type LobbyConnectionPacket = {
    lobbyId: string;
    players: Models.LobbyPlayer[];
    startTimestamp: number;
};

export type GameConnectionPacket = {
  board: BoardState<Models.PieceModel>;
  bench: BoardState<Models.PieceModel>;
  players: Models.PlayerListPlayer[];

  battleTurn: number | null;

  // todo check which props we're sending here - no `ready` for example
  playerInfo: {
    health: number;
    opponentId: string | null;
    shopLocked: boolean;
    money: number;
    level: number;
    xp: number;
    cards: Models.Card[];
  };

  game: {
    round: number;
    phase: Models.GamePhase;
    phaseStartedAtSeconds: number;
  };
};

export enum ServerToClientMenuPacketOpcodes {
  LOBBY_CONNECTED = "lobbyConnected",
  GAME_CONNECTED = "gameConnected"
}

export type ServerToClientMenuPacketDefinitions = {
  [ServerToClientMenuPacketOpcodes.LOBBY_CONNECTED]: LobbyConnectionPacket,
  [ServerToClientMenuPacketOpcodes.GAME_CONNECTED]: GameConnectionPacket
};

export type ServerToClientMenuPacketAcknowledgements = {
  [ServerToClientMenuPacketOpcodes.LOBBY_CONNECTED]: never,
  [ServerToClientMenuPacketOpcodes.GAME_CONNECTED]: never
};
