import delay from "delay";

import { GameEvents, Player, PlayerEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import {
	InternalLifecycleHooks,
	runPreparingPhase,
} from "./preparingPhaseLoop";
import { BotImplementation, SetupBotLogicOptions } from "./types";

export const setupBotLogic = (
	entity: Player,
	implementation: BotImplementation,
	options: SetupBotLogicOptions = {}
) => setupBotLogicInternal(entity, implementation, options, {});

/** Lifecycle entry point with telemetry hooks; for harness/tooling use only. */
export const setupBotLogicInternal = (
	entity: Player,
	implementation: BotImplementation,
	options: SetupBotLogicOptions,
	hooks: InternalLifecycleHooks
) => {
	implementation.onGameStart?.(entity.id);

	entity.addListener({
		actionCreator: GameEvents.gamePhaseStartedEvent,
		effect: async ({ payload: { phase } }, api) => {
			api.cancelActiveListeners();

			const state = api.getState();
			if (state.playerInfo.health <= 0) {
				return;
			}

			if (api.player.settings.botInitialDelayMs > 0) {
				await delay(api.player.settings.botInitialDelayMs);
			}

			if (phase === GamePhase.PREPARING) {
				await runPreparingPhase(api, implementation, options, hooks);
			} else if (phase === GamePhase.PLAYING) {
				api.dispatch(PlayerEvents.clientFinishMatchEvent());
			}
		},
	});
};
