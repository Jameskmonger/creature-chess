import { buyCardDef } from "./buyCard";
import { buyXpDef } from "./buyXp";
import { dropPieceDef } from "./dropPiece";
import { quickChatDef } from "./quickChat";
import { quitGameDef } from "./quitGame";
import { readyUpDef } from "./readyUp";
import { PlayerActionRegistry } from "./registry";
import { rerollCardsDef } from "./rerollCards";
import { sellPieceDef } from "./sellPiece";
import { spectateDef } from "./spectate";
import { swapPieceDef } from "./swapPiece";
import { toggleShopLockDef } from "./toggleShopLock";

export * from "./creators";

/** The gamemode's built-in player actions. */
const corePlayerActionDefs = [
	buyXpDef,
	buyCardDef,
	rerollCardsDef,
	toggleShopLockDef,
	sellPieceDef,
	readyUpDef,
	quitGameDef,
	dropPieceDef,
	spectateDef,
	swapPieceDef,
	quickChatDef,
] as const;

export const registerCorePlayerActions = (
	registry: PlayerActionRegistry
): void => {
	for (const def of corePlayerActionDefs) {
		registry.register(def);
	}
};

export {
	PlayerActionTypesArray,
	type PlayerAction,
} from "@creature-chess/models";
