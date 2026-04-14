import { AppState } from "~/store";
import { ClientStartListening } from "~/store/listenerContext";

import {
	BattleCommands,
	seedCombatStore,
	setupBattleListeners,
} from "@creature-chess/battle";
import { GameEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { gameStartedAction } from "./gameStartedAction";

export const setupClientBattleListeners = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: gameStartedAction,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			const settings = (api.getState() as AppState).game.settings;
			const { matchBoard, pieceRegistry, animationEventStore, combatStore } =
				api.extra.slices;

			setupBattleListeners(
				startListening,
				settings,
				matchBoard,
				pieceRegistry,
				combatStore,
				(events) => animationEventStore.pushEvents(events)
			);
		},
	});

	startListening({
		actionCreator: GameEvents.gamePhaseStartedEvent,
		effect: async ({ payload: { phase } }, api) => {
			api.cancelActiveListeners();

			const { matchBoard, pieceRegistry, combatStore } = api.extra.slices;

			if (phase === GamePhase.PLAYING) {
				seedCombatStore(combatStore, matchBoard, pieceRegistry);
				api.dispatch(BattleCommands.startBattleCommand({}));
			}

			if (phase === GamePhase.PREPARING) {
				matchBoard.clear();
				combatStore.clear();
			}
		},
	});
};
