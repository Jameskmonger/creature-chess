import { AppState } from "~/store";
import { ClientStartListening } from "~/store/listenerContext";

import {
	BattleCommands,
	setupBattleListeners,
} from "@creature-chess/battle";
import { GameEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { gameStartedAction } from "./gameStartedAction";

export const setupClientBattleListeners = (startListening: ClientStartListening) => {
	startListening({
		actionCreator: gameStartedAction,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			const settings = (api.getState() as AppState).game.settings;
			const { matchBoard, pieceRegistry, animationEventStore } = api.extra.slices;

			setupBattleListeners(
				startListening,
				settings,
				matchBoard,
				pieceRegistry,
				(events) => animationEventStore.pushEvents(events),
			);
		},
	});

	startListening({
		actionCreator: GameEvents.gamePhaseStartedEvent,
		effect: async ({ payload: { phase } }, api) => {
			api.cancelActiveListeners();

			const { matchBoard } = api.extra.slices;

			if (phase === GamePhase.PLAYING) {
				api.dispatch(BattleCommands.startBattleCommand({}));
			}

			if (phase === GamePhase.PREPARING) {
				matchBoard.clear();
			}
		},
	});
};
