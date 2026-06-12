import { GameEvents } from "@creature-chess/models";
import {
	pauseBattleCommand,
	resumeBattleCommand,
	startBattleCommand,
} from "~/store/battle/commands";
import { battleFinishEvent } from "~/store/battle/events";
import { ClientStartListening } from "~/store/listenerContext";

import { seedCombatStore } from "@creature-chess/battle";
import { GamePhase } from "@creature-chess/models";

export const setupClientBattleListeners = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: pauseBattleCommand,
		effect: (_action, api) => {
			api.extra.sessionHolder.peek()?.battle.pause();
		},
	});

	startListening({
		actionCreator: resumeBattleCommand,
		effect: (_action, api) => {
			api.extra.sessionHolder.peek()?.battle.resume();
		},
	});

	startListening({
		actionCreator: startBattleCommand,
		effect: async (action, api) => {
			api.cancelActiveListeners();

			const session = api.extra.sessionHolder.get();
			const { turn } = await session.battle.start(action.payload.turn ?? 0);

			// A newer startBattleCommand cancelled this listener instance while we
			// were awaiting the runner; the superseding instance owns the dispatch.
			if (api.signal.aborted) {
				return;
			}

			api.dispatch(battleFinishEvent({ turn }));
		},
	});

	startListening({
		actionCreator: GameEvents.gamePhaseStartedEvent,
		effect: ({ payload: { phase } }, api) => {
			api.cancelActiveListeners();

			const { battle, pieceRegistry } = api.extra.sessionHolder.get();

			if (phase === GamePhase.PLAYING) {
				seedCombatStore(battle.combatStore, battle.board, pieceRegistry);
				api.dispatch(startBattleCommand({}));
			}

			if (phase === GamePhase.PREPARING) {
				battle.board.clear();
				battle.combatStore.clear();
			}
		},
	});
};
