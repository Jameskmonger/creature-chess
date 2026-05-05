import { type BuyCardPlayerAction, buyCardDef, buyCardPlayerAction } from "./buyCard";
import { type BuyXpPlayerAction, buyXpDef, buyXpPlayerAction } from "./buyXp";
import {
	type DropPiecePlayerAction,
	dropPieceDef,
	dropPiecePlayerAction,
} from "./dropPiece";
import {
	type QuickChatPlayerAction,
	quickChatDef,
	quickChatPlayerAction,
} from "./quickChat";
import {
	type QuitGamePlayerAction,
	quitGameDef,
	quitGamePlayerAction,
} from "./quitGame";
import {
	type ReadyUpPlayerAction,
	readyUpDef,
	readyUpPlayerAction,
} from "./readyUp";
import { buildPlayerActionRegistry } from "./registry";
import {
	type RerollCardsPlayerAction,
	rerollCardsDef,
	rerollCardsPlayerAction,
} from "./rerollCards";
import {
	type SellPiecePlayerAction,
	sellPieceDef,
	sellPiecePlayerAction,
} from "./sellPiece";
import {
	type SpectatePlayerAction,
	spectateDef,
	spectatePlayerAction,
} from "./spectate";
import {
	type SwapPiecePlayerAction,
	swapPieceDef,
	swapPiecePlayerAction,
} from "./swapPiece";
import {
	type ToggleShopLockPlayerAction,
	toggleShopLockDef,
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

const playerActionDefs = [
	buyXpDef,
	buyCardDef,
	rerollCardsDef,
	toggleShopLockDef,
	sellPieceDef,
	readyUpDef,
	quitGameDef,
	dropPieceDef,
	spectateDef,
	quickChatDef,
	swapPieceDef,
] as const;

const registry = buildPlayerActionRegistry(playerActionDefs);

export const PlayerActionTypesArray = registry.types;
export const dispatchIncomingPlayerAction = registry.dispatchIncoming;
export const dispatchTrustedPlayerAction = registry.dispatchTrusted;

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
