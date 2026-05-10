import { PlayerCommands } from "@creature-chess/gamemode";

import { ClientStartListening } from "../../listenerContext";
import { playersActions } from "./state";

/**
 * Listener-middleware adapter routing playerInfo/* wire updates into the
 * `players` slice. The wire shape carries no player id (these actions only
 * concern the local Player); we read it from `extra.accountIdHolder` and tag
 * the dispatch.
 */
export const setupPlayersSyncListeners = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: PlayerCommands.playerInfoCommands.updateHealthCommand,
		effect: ({ payload }, api) => {
			const id = api.extra.accountIdHolder.peek();
			if (!id) {
				return;
			}
			api.dispatch(playersActions.setLocalHealth({ id, health: payload }));
		},
	});

	startListening({
		actionCreator: PlayerCommands.playerInfoCommands.updateMoneyCommand,
		effect: ({ payload }, api) => {
			const id = api.extra.accountIdHolder.peek();
			if (!id) {
				return;
			}
			api.dispatch(playersActions.setLocalMoney({ id, money: payload }));
		},
	});

	startListening({
		actionCreator: PlayerCommands.playerInfoCommands.updateLevelCommand,
		effect: ({ payload }, api) => {
			const id = api.extra.accountIdHolder.peek();
			if (!id) {
				return;
			}
			api.dispatch(playersActions.setLocalLevel({ id, level: payload.level }));
		},
	});

	startListening({
		actionCreator: PlayerCommands.playerInfoCommands.updateReadyCommand,
		effect: ({ payload }, api) => {
			const id = api.extra.accountIdHolder.peek();
			if (!id) {
				return;
			}
			api.dispatch(playersActions.setLocalReady({ id, ready: payload }));
		},
	});

	startListening({
		actionCreator: PlayerCommands.playerInfoCommands.updateStreakCommand,
		effect: ({ payload }, api) => {
			const id = api.extra.accountIdHolder.peek();
			if (!id) {
				return;
			}
			api.dispatch(
				playersActions.setLocalStreak({
					id,
					streakType: payload.type,
					streakAmount: payload.amount,
				})
			);
		},
	});

	startListening({
		actionCreator: PlayerCommands.playerInfoCommands.updateBattleCommand,
		effect: ({ payload }, api) => {
			const id = api.extra.accountIdHolder.peek();
			if (!id) {
				return;
			}
			api.dispatch(playersActions.setLocalBattle({ id, battle: payload }));
		},
	});

	startListening({
		actionCreator: PlayerCommands.playerInfoCommands.updateStatusCommand,
		effect: ({ payload }, api) => {
			const id = api.extra.accountIdHolder.peek();
			if (!id) {
				return;
			}
			api.dispatch(playersActions.setLocalStatus({ id, status: payload }));
		},
	});
};
