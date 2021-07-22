import { BuyCardPlayerAction, buyCardPlayerAction } from "./buyCard";
export { BuyCardPlayerAction, buyCardPlayerAction };

import { BuyXpPlayerAction, buyXpPlayerAction } from "./buyXp";
export { BuyXpPlayerAction, buyXpPlayerAction };

import { RerollCardsPlayerAction, rerollCardsPlayerAction } from "./rerollCards";
export { RerollCardsPlayerAction, rerollCardsPlayerAction };

import { ToggleShopLockPlayerAction, toggleShopLockPlayerAction } from "./toggleShopLock";
export { ToggleShopLockPlayerAction, toggleShopLockPlayerAction };

import { SellPiecePlayerAction, sellPiecePlayerAction } from "./sellPiece";
export { SellPiecePlayerAction, sellPiecePlayerAction };

import { ReadyUpPlayerAction, readyUpPlayerAction } from "./readyUp";
export { ReadyUpPlayerAction, readyUpPlayerAction };

import { QuitGamePlayerAction, quitGamePlayerAction } from "./quitGame";
export { QuitGamePlayerAction, quitGamePlayerAction };

import { DropPiecePlayerAction, dropPiecePlayerAction } from "./dropPiece";
export { DropPiecePlayerAction, dropPiecePlayerAction };

import { SwapPiecePlayerAction, swapPiecePlayerAction } from "./swapPiece";
export { SwapPiecePlayerAction, swapPiecePlayerAction };

import { SpectatePlayerAction, spectatePlayerAction } from "./spectate";
export { SpectatePlayerAction, spectatePlayerAction };

export const PlayerActionTypesArray = [
	buyXpPlayerAction.toString(),
	buyCardPlayerAction.toString(),
	rerollCardsPlayerAction.toString(),
	toggleShopLockPlayerAction.toString(),
	sellPiecePlayerAction.toString(),
	readyUpPlayerAction.toString(),
	quitGamePlayerAction.toString(),
	dropPiecePlayerAction.toString(),
	swapPiecePlayerAction.toString(),
	spectatePlayerAction.toString()
];

export type PlayerAction =
	BuyXpPlayerAction
	| BuyCardPlayerAction
	| RerollCardsPlayerAction
	| ToggleShopLockPlayerAction
	| SellPiecePlayerAction
	| ReadyUpPlayerAction
	| QuitGamePlayerAction
	| DropPiecePlayerAction
	| SwapPiecePlayerAction
	| SpectatePlayerAction;
