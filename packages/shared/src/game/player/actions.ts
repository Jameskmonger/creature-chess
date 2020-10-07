import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";

export const PLAYER_FINISH_MATCH = "PLAYER_FINISH_MATCH";
export type PLAYER_FINISH_MATCH = typeof PLAYER_FINISH_MATCH;
export type PlayerFinishMatchAction = ({ type: PLAYER_FINISH_MATCH, payload: { homeScore: number, awayScore: number } });
export const playerFinishMatch = (homeScore: number, awayScore: number): PlayerFinishMatchAction => ({
    type: PLAYER_FINISH_MATCH,
    payload: { homeScore, awayScore }
});

export const AFTER_SELL_PIECE = "AFTER_SELL_PIECE";
export type AFTER_SELL_PIECE = typeof AFTER_SELL_PIECE;
export type AfterSellPieceAction = ({ type: AFTER_SELL_PIECE, payload: { piece: PieceModel } });
export const afterSellPiece = (piece: PieceModel): AfterSellPieceAction => ({ type: AFTER_SELL_PIECE, payload: { piece } });

export const AFTER_REROLL_CARDS = "AFTER_REROLL_CARDS";
export type AFTER_REROLL_CARDS = typeof AFTER_REROLL_CARDS;
export type AfterRerollCardsAction = ({ type: AFTER_REROLL_CARDS });
export const afterRerollCards = (): AfterRerollCardsAction => ({ type: AFTER_REROLL_CARDS });

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
export const QUIT_GAME = "QUIT_GAME";
export type QUIT_GAME = typeof QUIT_GAME;

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
  PLAYER_DROP_PIECE, PLAYER_SELL_PIECE, REROLL_CARDS, BUY_CARD,
  BUY_XP, READY_UP, TOGGLE_SHOP_LOCK, QUIT_GAME
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

export type QuitGameAction = ({ type: QUIT_GAME });
export const quitGame = (): QuitGameAction => ({ type: QUIT_GAME });