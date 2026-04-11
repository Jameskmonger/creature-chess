import { PlayerStartListening } from "../entities/player/player";
import { setupBuyCardListener } from "./buyCard";
import { setupBuyXpListener } from "./buyXp";
import { setupDropPieceListener } from "./dropPiece";
import { setupQuickChatListener } from "./quickChat";
import { setupReadyUpListener } from "./readyUp";
import { setupRerollCardsListener } from "./rerollCards";
import { setupSellPieceListener } from "./sellPiece";
import { setupSpectateListener } from "./spectate";
import { setupSwapPieceListener } from "./swapPiece";
import { setupToggleShopLockListener } from "./toggleShopLock";

export const setupPlayerActionListeners = (
	startListening: PlayerStartListening
) => {
	setupBuyXpListener(startListening);
	setupBuyCardListener(startListening);
	setupRerollCardsListener(startListening);
	setupToggleShopLockListener(startListening);
	setupSellPieceListener(startListening);
	setupDropPieceListener(startListening);
	setupSwapPieceListener(startListening);
	setupSpectateListener(startListening);
	setupReadyUpListener(startListening);
	setupQuickChatListener(startListening);
};
