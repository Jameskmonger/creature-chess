import { BuyCardPlayerAction, buyCardPlayerAction } from "./buyCard";
import { BuyXpPlayerAction, buyXpPlayerAction } from "./buyXp";
import { DropPiecePlayerAction, dropPiecePlayerAction } from "./dropPiece";
import { QuickChatPlayerAction, quickChatPlayerAction } from "./quickChat";
import { QuitGamePlayerAction, quitGamePlayerAction } from "./quitGame";
import { ReadyUpPlayerAction, readyUpPlayerAction } from "./readyUp";
import {
	RerollCardsPlayerAction,
	rerollCardsPlayerAction,
} from "./rerollCards";
import { SellPiecePlayerAction, sellPiecePlayerAction } from "./sellPiece";
import { SpectatePlayerAction, spectatePlayerAction } from "./spectate";
import { SwapPiecePlayerAction, swapPiecePlayerAction } from "./swapPiece";
import {
	ToggleShopLockPlayerAction,
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
