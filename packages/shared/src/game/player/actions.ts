import { PlayerPieceLocation } from "@creature-chess/models";

export const PLAYER_DROP_PIECE_ACTION = "PLAYER_DROP_PIECE_ACTION";
export type PLAYER_DROP_PIECE_ACTION = typeof PLAYER_DROP_PIECE_ACTION;
export const PLAYER_SELL_PIECE_ACTION = "PLAYER_SELL_PIECE_ACTION";
export type PLAYER_SELL_PIECE_ACTION = typeof PLAYER_SELL_PIECE_ACTION;
export const REROLL_CARDS_ACTION = "REROLL_CARDS_ACTION";
export type REROLL_CARDS_ACTION = typeof REROLL_CARDS_ACTION;
export const BUY_CARD_ACTION = "BUY_CARD_ACTION";
export type BUY_CARD_ACTION = typeof BUY_CARD_ACTION;
export const BUY_XP_ACTION = "BUY_XP_ACTION";
export type BUY_XP_ACTION = typeof BUY_XP_ACTION;
export const READY_UP_ACTION = "READY_UP_ACTION";
export type READY_UP_ACTION = typeof READY_UP_ACTION;
export const TOGGLE_SHOP_LOCK_ACTION = "TOGGLE_SHOP_LOCK_ACTION";
export type TOGGLE_SHOP_LOCK_ACTION = typeof TOGGLE_SHOP_LOCK_ACTION;
export const QUIT_GAME_ACTION = "QUIT_GAME_ACTION";
export type QUIT_GAME_ACTION = typeof QUIT_GAME_ACTION;

export type PlayerAction =
  PlayerDropPieceAction
  | PlayerSellPieceAction
  | RerollCardsAction
  | BuyCardAction
  | BuyXpAction
  | ReadyUpAction
  | ToggleShopLockAction
  | QuitGameAction;

export const PlayerActionTypesArray = [
  PLAYER_DROP_PIECE_ACTION, PLAYER_SELL_PIECE_ACTION, REROLL_CARDS_ACTION, BUY_CARD_ACTION,
  BUY_XP_ACTION, READY_UP_ACTION, TOGGLE_SHOP_LOCK_ACTION, QUIT_GAME_ACTION
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

// card ownership

export type PlayerSellPieceAction = { type: PLAYER_SELL_PIECE_ACTION, payload: { pieceId: string } };
export const playerSellPieceAction = (pieceId: string): PlayerSellPieceAction => ({
  type: PLAYER_SELL_PIECE_ACTION,
  payload: { pieceId }
});
export type RerollCardsAction = ({ type: REROLL_CARDS_ACTION });
export const rerollCardsAction = (): RerollCardsAction => ({ type: REROLL_CARDS_ACTION });
export type BuyCardAction = ({ type: BUY_CARD_ACTION, payload: { index: number }});
export const buyCardAction = (index: number): BuyCardAction => ({ type: BUY_CARD_ACTION, payload: { index }});
export type ToggleShopLockAction = ({ type: TOGGLE_SHOP_LOCK_ACTION });
export const toggleShopLock = (): ToggleShopLockAction => ({ type: TOGGLE_SHOP_LOCK_ACTION });

// local player profile

export type BuyXpAction = ({ type: BUY_XP_ACTION });
export const buyXpAction = (): BuyXpAction => ({ type: BUY_XP_ACTION });
export type ReadyUpAction = ({ type: READY_UP_ACTION });
export const readyUpAction = (): ReadyUpAction => ({ type: READY_UP_ACTION });
export type QuitGameAction = ({ type: QUIT_GAME_ACTION });
export const quitGameAction = (): QuitGameAction => ({ type: QUIT_GAME_ACTION });
