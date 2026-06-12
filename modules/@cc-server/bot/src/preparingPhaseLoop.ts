import { Player } from "@creature-chess/gamemode";
import { PlayerActions } from "@creature-chess/models";
import delay from "delay";

import {
	BotAction,
	BotImplementation,
	PreparingPhaseContext,
	SetupBotLogicOptions,
} from "./types";

const DEFAULT_ACTION_BUDGET = 200;

export type InternalLifecycleHooks = {
	actionBudgetSpec?: { multiplier: number; min: number; max: number };
	onActionDispatched?: (action: BotAction) => void;
	onPhaseEnded?: (info: PhaseEndInfo) => void;
};

export type PhaseEndInfo = {
	actionsTaken: number;
	actionBudget: number;
	terminationReason: "readyUp" | "budget" | "dead" | "cancelled";
};

function getActionBudget(
	totalPieces: number,
	options: SetupBotLogicOptions,
	hooks: InternalLifecycleHooks
): number {
	if (!hooks.actionBudgetSpec) {
		return options.actionBudget ?? DEFAULT_ACTION_BUDGET;
	}

	return Math.min(
		hooks.actionBudgetSpec.max,
		Math.max(
			hooks.actionBudgetSpec.min,
			totalPieces * hooks.actionBudgetSpec.multiplier
		)
	);
}

export const runPreparingPhase = async (
	player: Player,
	signal: AbortSignal,
	implementation: BotImplementation,
	options: SetupBotLogicOptions,
	hooks: InternalLifecycleHooks
): Promise<void> => {
	const {
		settings,
		board,
		bench,
		gamemode: { pieceRegistry, creatures },
	} = player;

	const rng = options.rng ?? Math.random;
	const actionBudget = getActionBudget(
		board.getAllPieces().length + bench.getAllPieces().length,
		options,
		hooks
	);

	if (settings.botActionDelayMs > 0) {
		await delay(settings.botActionDelayMs);
		if (signal.aborted) {
			hooks.onPhaseEnded?.({
				actionsTaken: 0,
				actionBudget,
				terminationReason: "cancelled",
			});
			return;
		}
	}

	let actionsTaken = 0;
	let terminationReason: PhaseEndInfo["terminationReason"] = "budget";

	while (actionsTaken < actionBudget) {
		if (signal.aborted) {
			terminationReason = "cancelled";
			break;
		}
		if (!player.alive) {
			terminationReason = "dead";
			break;
		}

		const ctx: PreparingPhaseContext = {
			board,
			bench,
			pieceRegistry,
			creatures,
			player,
			settings,
			rng,
		};

		const action = implementation.decidePreparingAction(ctx);

		if (action === null) {
			terminationReason = "readyUp";
			break;
		}

		player.gamemode.playerActions.dispatchTrusted(player, action);
		hooks.onActionDispatched?.(action);
		actionsTaken += 1;

		if (settings.botActionDelayMs > 0) {
			await delay(settings.botActionDelayMs);
		}
	}

	hooks.onPhaseEnded?.({ actionsTaken, actionBudget, terminationReason });

	if (terminationReason === "cancelled") {
		return;
	}

	player.gamemode.playerActions.dispatchTrusted(
		player,
		PlayerActions.readyUpPlayerAction()
	);
};
