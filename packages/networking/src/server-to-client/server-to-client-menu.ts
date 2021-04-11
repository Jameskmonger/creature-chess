import * as Models from "@creature-chess/models";
import { BoardState } from "@creature-chess/board";
import { GameInfoState } from "@creature-chess/gamemode";

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

  game: GameInfoState;
};

export enum PacketOpcodes {
  LOBBY_CONNECTED = "lobbyConnected",
  GAME_CONNECTED = "gameConnected"
}

export type PacketDefinitions = {
  [PacketOpcodes.LOBBY_CONNECTED]: LobbyConnectionPacket,
  [PacketOpcodes.GAME_CONNECTED]: GameConnectionPacket
};

export type PacketAcknowledgements = {
  [PacketOpcodes.LOBBY_CONNECTED]: never,
  [PacketOpcodes.GAME_CONNECTED]: never
};
