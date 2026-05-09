import { getGameConnectionRef } from "~/networking/connectionRef";
import { AppState } from "~/store";
import { setupBoardSyncListeners } from "~/store/board/sync";
import { clearSelectedPiece } from "~/store/game/ui/actions";
import { ClientStartListening } from "~/store/listenerContext";
import { setupSettingsListener } from "~/store/settings/sync";

import * as BattleEvents from "~/store/battle/events";

import { PlayerActions } from "@creature-chess/gamemode";

import { setupClientBattleListeners } from "./battle";
import { setupQuickChatListener } from "./chat/quickChat";
import { setupCloseShopOnFirstBuyListener } from "./closeShopOnFirstBuy";
import { setupForwardPlayerActions } from "./forwardPlayerActions";
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

	// Session must be set before any other listener tries to read it.
	setupSettingsListener(startListening);

	setupForwardPlayerActions(startListening);
	setupPreventAccidentalCloseListener(startListening);
	setupCloseShopOnFirstBuyListener(startListening);
	setupClientBattleListeners(startListening);
	setupUiListener(startListening);
	setupQuickChatListener(startListening);
	setupBoardSyncListeners(startListening);
};
