import { PlayerPieceLocation } from "../models";

export const PLAYER_DROP_PIECE = "PLAYER_DROP_PIECE";
export type PLAYER_DROP_PIECE = typeof PLAYER_DROP_PIECE;
export const PLAYER_SELL_PIECE = "PLAYER_SELL_PIECE";
export type PLAYER_SELL_PIECE = typeof PLAYER_SELL_PIECE;
export const REROLL_CARDS = "REROLL_CARDS";
export type REROLL_CARDS = typeof REROLL_CARDS;
export const BUY_CARD = "BUY_CARD";
export type BUY_CARD = typeof BUY_CARD;
export const BUY_XP = "BUY_XP";
export type BUY_XP = typeof BUY_XP;
export const READY_UP = "READY_UP";
export type READY_UP = typeof READY_UP;
export const TOGGLE_SHOP_LOCK = "TOGGLE_SHOP_LOCK";
export type TOGGLE_SHOP_LOCK = typeof TOGGLE_SHOP_LOCK;

export type PlayerAction =
  PlayerDropPieceAction
  | PlayerSellPieceAction
  | RerollCardsAction
  | BuyCardAction
  | BuyXpAction
  | ReadyUpAction
  | ToggleShopLockAction;

export const PlayerActionTypesArray = [
  PLAYER_DROP_PIECE, PLAYER_SELL_PIECE, REROLL_CARDS, BUY_CARD,
  BUY_XP, READY_UP, TOGGLE_SHOP_LOCK
];

// card management

export type PlayerDropPieceAction = {
  type: PLAYER_DROP_PIECE,
  payload: {
    pieceId: string,
    from: PlayerPieceLocation,
    to: PlayerPieceLocation
  }
};

export const playerDropPiece = (
  pieceId: string,
  from: PlayerPieceLocation,
  to: PlayerPieceLocation
): PlayerDropPieceAction => ({
  type: PLAYER_DROP_PIECE,
  payload: {
    pieceId, from, to
  }
});

// card ownership

export type PlayerSellPieceAction = { type: PLAYER_SELL_PIECE, payload: { pieceId: string } };
export type RerollCardsAction = ({ type: REROLL_CARDS });
export type BuyCardAction = ({ type: BUY_CARD, payload: { index: number }});
export type ToggleShopLockAction = ({ type: TOGGLE_SHOP_LOCK });

export const playerSellPiece = (pieceId: string): PlayerSellPieceAction => ({
  type: PLAYER_SELL_PIECE,
  payload: {
    pieceId
  }
});

export const rerollCards = (): RerollCardsAction => ({ type: REROLL_CARDS });

export const buyCard = (index: number): BuyCardAction => ({
  type: BUY_CARD,
  payload: {
    index
  }
});

export const toggleShopLock = (): ToggleShopLockAction => ({ type: TOGGLE_SHOP_LOCK });

// local player profile

export type BuyXpAction = ({ type: BUY_XP });
export type ReadyUpAction = ({ type: READY_UP });

export const buyXpAction = (): BuyXpAction => ({
  type: BUY_XP
});

export const readyUpAction = (): ReadyUpAction => ({
  type: READY_UP
});
