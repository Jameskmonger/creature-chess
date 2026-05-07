import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";

import { Board } from "@creature-chess/board";
import {
	BattleEvent,
	BattleRunner,
	PieceCombatState,
	PieceInfoStore,
} from "@creature-chess/battle";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import {
	pauseBattleCommand,
	resumeBattleCommand,
	startBattleCommand,
} from "./commands";
import { battleFinishEvent } from "./events";

export const setupBattleListeners = <TState>(
	startListening: TypedStartListening<TState, Dispatch<UnknownAction>>,
	settings: GamemodeSettings,
	board: Board,
	pieceRegistry: PieceRegistry,
	combatStore: PieceInfoStore<PieceCombatState>,
	onEvents?: (events: BattleEvent[]) => void
) => {
	let runner: BattleRunner | null = null;

	startListening({
		actionCreator: pauseBattleCommand,
		effect: async () => {
			runner?.pause();
		},
	});

	startListening({
		actionCreator: resumeBattleCommand,
		effect: async () => {
			runner?.resume();
		},
	});

	startListening({
		actionCreator: startBattleCommand,
		effect: async (action, api) => {
			api.cancelActiveListeners();

			runner = new BattleRunner(
				board,
				pieceRegistry,
				combatStore,
				settings,
				action.payload.turn || 0,
				onEvents
			);

			const { turn } = await runner.run();
			api.dispatch(battleFinishEvent({ turn }));
		},
	});
};
