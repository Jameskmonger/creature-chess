import { ClientStartListening } from "~/store/listenerContext";

import { BattleEvents } from "@creature-chess/battle";
import { PlayerActions } from "@creature-chess/gamemode";

import { getGameConnectionRef } from "~/networking/connectionRef";

import { setupClientBattleListeners } from "./battle";
import { setupClickPieceListener } from "./board/clickPiece";
import { setupClickTileListener } from "./board/clickTile";
import { setupQuickChatListener } from "./chat/quickChat";
import { setupCloseShopOnFirstBuyListener } from "./closeShopOnFirstBuy";
import { setupPreventAccidentalCloseListener } from "./preventAccidentalClose";
import { setupUiListener } from "./ui";

export const setupGameListeners = (startListening: ClientStartListening) => {
	// Bridge: forward battle finish to network
	startListening({
		actionCreator: BattleEvents.battleFinishEvent,
		effect: async () => {
			const gameConnection = getGameConnectionRef();
			gameConnection?.sendFinishMatch();
		},
	});

	// Bridge: forward board actions to network
	for (const actionCreator of [PlayerActions.dropPiecePlayerAction, PlayerActions.swapPiecePlayerAction]) {
		startListening({
			actionCreator,
			effect: async (action) => {
				const gameConnection = getGameConnectionRef();
				gameConnection?.sendPlayerAction(action);
			},
		});
	}

	// Set up all sub-listeners
	setupPreventAccidentalCloseListener(startListening);
	setupCloseShopOnFirstBuyListener(startListening);
	setupClickTileListener(startListening);
	setupClickPieceListener(startListening);
	setupClientBattleListeners(startListening);
	setupUiListener(startListening);
	setupQuickChatListener(startListening);
};
