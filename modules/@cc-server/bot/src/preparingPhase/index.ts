import delay from "delay";
import { appendFileSync } from "fs";

import { PlayerActions, PlayerStateSelectors } from "@creature-chess/gamemode";
import { PlayerListenerApi } from "@creature-chess/gamemode";

import { BotPersonality } from "@cc-server/data";

import { getActions } from "../actions";
import { BrainAction } from "../brain";
import { putBenchOnBoard } from "../putBenchOnBoard";
import { PASS_ACTION_NAME } from "./actions";

/**
 * Emit a structured decision record to the debug sink when DEBUG_BOT=1.
 *
 * Sink priority:
 * 1. `DEBUG_BOT_LOG_FILE` env var → JSONL append (used by the bot-arena harness,
 * which sets a per-worker file path to avoid interleaving).
 * 2. Otherwise → stdout with a `[DEBUG_BOT]` prefix.
 *
 * No-op entirely when DEBUG_BOT is unset.
 */
const logBotDecision = (record: Record<string, unknown>) => {
	if (process.env.DEBUG_BOT !== "1") {
		return;
	}

	const line = JSON.stringify(record);
	const file = process.env.DEBUG_BOT_LOG_FILE;

	if (file) {
		try {
			appendFileSync(file, line + "\n");
			return;
		} catch {
			// Fall through to stdout if the file path is bad or unwriteable.
		}
	}

	// eslint-disable-next-line no-console
	console.log("[DEBUG_BOT]", line);
};

const summariseAction = (action: BrainAction) => ({
	name: action.name,
	value: action.value,
});

export const preparingPhase = async (
	api: PlayerListenerApi,
	personality: BotPersonality
) => {
	const {
		settings,
		board,
		bench,
		gamemode: { pieceRegistry },
	} = api.player;

	if (settings.botActionDelayMs > 0) {
		await delay(settings.botActionDelayMs);
	}

	while (true) {
		const state = api.getState();

		// If the bot has been eliminated mid-phase, stop acting. The RTK
		// listener's abort signal only propagates through `api.delay` /
		// `api.take`, and this loop awaits `delay` from the npm package, so
		// cancellation never reaches it. Without this guard, a dead bot's
		// loop keeps picking reroll → dispatch → loop forever until the
		// next `gamePhaseStartedEvent` fires (which in the harness can be
		// tens of rounds away) — burning cycles on the server for no effect.
		if (PlayerStateSelectors.getPlayerHealth(state) <= 0) {
			break;
		}

		const actions = getActions(
			board,
			bench,
			pieceRegistry,
			state,
			personality,
			settings
		);

		if (actions.length === 0) {
			break;
		}

		const [mostValuable] = actions;

		logBotDecision({
			playerId: api.player.id,
			playerName: api.player.name,
			personality,
			round: state.roundInfo.round,
			health: PlayerStateSelectors.getPlayerHealth(state),
			money: PlayerStateSelectors.getPlayerMoney(state),
			level: PlayerStateSelectors.getPlayerLevel(state),
			chosen: {
				name: mostValuable.name,
				value: mostValuable.value,
				breakdown: mostValuable.breakdown,
			},
			// Top 3 runners-up give context on how close the decision was.
			runnersUp: actions.slice(1, 4).map(summariseAction),
		});

		// Pass wins → bot is happy doing nothing for the rest of the phase.
		if (mostValuable.name === PASS_ACTION_NAME) {
			break;
		}

		api.dispatch(mostValuable.action());

		if (settings.botActionDelayMs > 0) {
			await delay(settings.botActionDelayMs);
		}

		await putBenchOnBoard(api);
	}

	api.dispatch(PlayerActions.readyUpPlayerAction());
};
