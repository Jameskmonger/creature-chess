import {
  PLAYER_DROP_PIECE, PLAYER_SELL_PIECE, REROLL_CARDS,
  BUY_CARD, BUY_XP, READY_UP, TOGGLE_SHOP_LOCK
} from "./actionTypes";
import { PlayerPieceLocation } from "@common/models";

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
