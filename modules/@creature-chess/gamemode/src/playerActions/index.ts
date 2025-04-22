import { type BuyCardPlayerAction, buyCardPlayerAction } from "./buyCard";
import { type BuyXpPlayerAction, buyXpPlayerAction } from "./buyXp";
import { type DropPiecePlayerAction, dropPiecePlayerAction } from "./dropPiece";
import { type QuickChatPlayerAction, quickChatPlayerAction } from "./quickChat";
import { type QuitGamePlayerAction, quitGamePlayerAction } from "./quitGame";
import { type ReadyUpPlayerAction, readyUpPlayerAction } from "./readyUp";
import {
	type RerollCardsPlayerAction,
	rerollCardsPlayerAction,
} from "./rerollCards";
import { type SellPiecePlayerAction, sellPiecePlayerAction } from "./sellPiece";
import { type SpectatePlayerAction, spectatePlayerAction } from "./spectate";
import { type SwapPiecePlayerAction, swapPiecePlayerAction } from "./swapPiece";
import {
	type ToggleShopLockPlayerAction,
	toggleShopLockPlayerAction,
} from "./toggleShopLock";

export { BuyCardPlayerAction, buyCardPlayerAction };

export { BuyXpPlayerAction, buyXpPlayerAction };

export { RerollCardsPlayerAction, rerollCardsPlayerAction };

export { ToggleShopLockPlayerAction, toggleShopLockPlayerAction };

export { SellPiecePlayerAction, sellPiecePlayerAction };

export { ReadyUpPlayerAction, readyUpPlayerAction };

export { QuitGamePlayerAction, quitGamePlayerAction };

export { DropPiecePlayerAction, dropPiecePlayerAction };

export { SwapPiecePlayerAction, swapPiecePlayerAction };

export { SpectatePlayerAction, spectatePlayerAction };

export { QuickChatPlayerAction, quickChatPlayerAction };

export const PlayerActionTypesArray = [
	buyXpPlayerAction.toString(),
	buyCardPlayerAction.toString(),
	rerollCardsPlayerAction.toString(),
	toggleShopLockPlayerAction.toString(),
	sellPiecePlayerAction.toString(),
	readyUpPlayerAction.toString(),
	quitGamePlayerAction.toString(),
	dropPiecePlayerAction.toString(),
	spectatePlayerAction.toString(),
	quickChatPlayerAction.toString(),
	spectatePlayerAction.toString(),
	swapPiecePlayerAction.toString(),
];

export type PlayerAction =
	| BuyXpPlayerAction
	| BuyCardPlayerAction
	| RerollCardsPlayerAction
	| ToggleShopLockPlayerAction
	| SellPiecePlayerAction
	| ReadyUpPlayerAction
	| QuitGamePlayerAction
	| DropPiecePlayerAction
	| QuickChatPlayerAction
	| SwapPiecePlayerAction
	| SpectatePlayerAction;
