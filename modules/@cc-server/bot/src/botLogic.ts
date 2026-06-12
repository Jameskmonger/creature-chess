import { Player } from "@creature-chess/gamemode";
import delay from "delay";

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

	let currentAbort: AbortController | null = null;

	return entity.gamemode.events.onPhaseStart(async (action) => {
		currentAbort?.abort();
		const ac = new AbortController();
		currentAbort = ac;

		if (!entity.alive) {
			return;
		}

		if (entity.settings.botInitialDelayMs > 0) {
			await delay(entity.settings.botInitialDelayMs);
			if (ac.signal.aborted) {
				return;
			}
		}

		const { phase } = action.payload;
		if (phase === GamePhase.PREPARING) {
			await runPreparingPhase(
				entity,
				ac.signal,
				implementation,
				options,
				hooks
			);
		} else if (phase === GamePhase.PLAYING) {
			entity.emitClientFinishMatch();
		}
	});
};
