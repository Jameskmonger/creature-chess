import { PlayerActions } from "@creature-chess/models";
import { setupPluginListeners } from "~/plugins/redux";
import { pluginRegistry } from "~/plugins/registry";
import { AppState } from "~/store";
import * as BattleEvents from "~/store/battle/events";
import { setupBoardSyncListeners } from "~/store/board/sync";
import { setupPlayersSyncListeners } from "~/store/game/players/sync";
import { setupQuickChatListener } from "~/store/game/quickChat";
import { clearSelectedPiece } from "~/store/game/ui/actions";
import { ClientStartListening } from "~/store/listenerContext";
import { setupSettingsListener } from "~/store/settings/sync";

import { setupClientBattleListeners } from "./battle";
import { setupCloseShopOnFirstBuyListener } from "./closeShopOnFirstBuy";
import { setupForwardPlayerActions } from "./forwardPlayerActions";
import { setupPreventAccidentalCloseListener } from "./preventAccidentalClose";
import { setupUiListener } from "./ui";

export const setupGameListeners = (startListening: ClientStartListening) => {
	// Bridge: forward battle finish to network
	startListening({
		actionCreator: BattleEvents.battleFinishEvent,
		effect: async (_action, api) => {
			api.extra.gameConnectionHolder.peek()?.sendFinishMatch();
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
	setupClientBattleListeners(startListening);
	setupUiListener(startListening);
	setupBoardSyncListeners(startListening);
	setupPlayersSyncListeners(startListening);
	setupQuickChatListener(startListening);
	setupCloseShopOnFirstBuyListener(startListening);
	setupPreventAccidentalCloseListener(startListening);

	setupPluginListeners(pluginRegistry, startListening);
};
