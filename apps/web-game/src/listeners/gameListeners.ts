import { getGameConnectionRef } from "~/networking/connectionRef";
import { AppState } from "~/store";
import { clearSelectedPiece } from "~/store/game/ui/actions";
import { ClientStartListening } from "~/store/listenerContext";

import * as BattleEvents from "~/store/battle/events";

import { PlayerActions } from "@creature-chess/gamemode";

import { setupClientBattleListeners } from "./battle";
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
	for (const actionCreator of [
		PlayerActions.dropPiecePlayerAction,
		PlayerActions.swapPiecePlayerAction,
	]) {
		startListening({
			actionCreator,
			effect: async (action) => {
				const gameConnection = getGameConnectionRef();
				gameConnection?.sendPlayerAction(action);
			},
		});
	}

	// Clear selection when the selected piece is sold
	startListening({
		actionCreator: PlayerActions.sellPiecePlayerAction,
		effect: async ({ payload: { pieceId } }, api) => {
			const selectedPieceId = (api.getState() as AppState).game.ui
				.selectedPieceId;

			if (selectedPieceId === pieceId) {
				api.dispatch(clearSelectedPiece());
			}
		},
	});

	// Set up all sub-listeners
	setupPreventAccidentalCloseListener(startListening);
	setupCloseShopOnFirstBuyListener(startListening);
	setupClientBattleListeners(startListening);
	setupUiListener(startListening);
	setupQuickChatListener(startListening);
};
