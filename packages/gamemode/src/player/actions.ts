import { PlayerPieceLocation, TileCoordinates } from "@creature-chess/models";

export const PLAYER_CLICK_TILE_ACTION = "PLAYER_CLICK_TILE_ACTION";
export type PLAYER_CLICK_TILE_ACTION = typeof PLAYER_CLICK_TILE_ACTION;
export const PLAYER_DROP_PIECE_ACTION = "PLAYER_DROP_PIECE_ACTION";
export type PLAYER_DROP_PIECE_ACTION = typeof PLAYER_DROP_PIECE_ACTION;
export const PLAYER_SELL_PIECE_ACTION = "PLAYER_SELL_PIECE_ACTION";
export type PLAYER_SELL_PIECE_ACTION = typeof PLAYER_SELL_PIECE_ACTION;
export const READY_UP_ACTION = "READY_UP_ACTION";
export type READY_UP_ACTION = typeof READY_UP_ACTION;
export const QUIT_GAME_ACTION = "QUIT_GAME_ACTION";
export type QUIT_GAME_ACTION = typeof QUIT_GAME_ACTION;

export type PlayerAction =
  PlayerDropPieceAction
  | PlayerSellPieceAction
  | ReadyUpAction
  | QuitGameAction;

export const PlayerActionTypesArray = [
  PLAYER_DROP_PIECE_ACTION, PLAYER_SELL_PIECE_ACTION,
  READY_UP_ACTION, QUIT_GAME_ACTION
];

// card management

export type PlayerDropPieceAction = {
  type: PLAYER_DROP_PIECE_ACTION,
  payload: {
    pieceId: string, to: PlayerPieceLocation, from: PlayerPieceLocation
  }
};
export const playerDropPieceAction = (pieceId: string, from: PlayerPieceLocation, to: PlayerPieceLocation): PlayerDropPieceAction => ({
  type: PLAYER_DROP_PIECE_ACTION,
  payload: { pieceId, to, from }
});

export type PlayerClickTileAction = {
  type: PLAYER_CLICK_TILE_ACTION,
  payload: {
    tile: PlayerPieceLocation
  }
};
export const playerClickTileAction = (tile: PlayerPieceLocation): PlayerClickTileAction => ({
  type: PLAYER_CLICK_TILE_ACTION,
  payload: { tile }
});

// card ownership

export type PlayerSellPieceAction = { type: PLAYER_SELL_PIECE_ACTION, payload: { pieceId: string } };
export const playerSellPieceAction = (pieceId: string): PlayerSellPieceAction => ({
  type: PLAYER_SELL_PIECE_ACTION,
  payload: { pieceId }
});

// local player profile

export type ReadyUpAction = ({ type: READY_UP_ACTION });
export const readyUpAction = (): ReadyUpAction => ({ type: READY_UP_ACTION });
export type QuitGameAction = ({ type: QUIT_GAME_ACTION });
export const quitGameAction = (): QuitGameAction => ({ type: QUIT_GAME_ACTION });
