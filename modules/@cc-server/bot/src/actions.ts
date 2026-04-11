import { Board } from "@creature-chess/board";
import { PlayerState } from "@creature-chess/gamemode";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "./brain";
import {
	createBuyXpAction,
	createBuyCardAction,
	createPassAction,
	createSellPieceAction,
	createRerollCardsAction,
} from "./preparingPhase/actions";

/**
 * Soft termination threshold on the `[0, 1]` utility scale. Actions scoring
 * below this are filtered out; when the filter drops every candidate,
 * `getActions` returns an empty array and the preparing-phase loop exits via
 * the `actions.length === 0` path.
 *
 * This separates "this action is impossible" (legality, still returned as
 * `null` from the action creators) from "this action would be a bad idea right
 * now" (soft score below threshold).
 *
 * The value `0.05` is a meaningful "action isn't worth the budget" floor on
 * the `[0, 1]` scale.
 */
const BOT_ACTION_THRESHOLD = 0.05;

/**
 * Softmax (Boltzmann) sample over a list of scored actions. Returns the index
 * of the chosen action in the input array.
 *
 * At `temperature → 0` the output approaches deterministic argmax. At larger
 * temperatures the distribution flattens toward uniform. We expect small
 * temperatures (~0.025–0.05) on the `[0, 1]` utility scale so that the
 * top-scored action is heavily favoured but close runner-ups occasionally
 * win — enough to break ties properly and diverge identically-personalitied
 * bots without drowning the personality signal in noise.
 *
 * Uses the log-sum-exp trick (subtract max before exponentiating) for
 * numerical stability. Without it, at `T = 0.025` with `value = 1.0` the
 * naive `Math.exp(1 / 0.025) = e^40 ≈ 2.4e17` — finite but precision-losing,
 * and smaller terms underflow asymmetrically.
 */
const softmaxSample = (actions: BrainAction[], temperature: number): number => {
	if (actions.length === 0) {
		return -1;
	}
	if (actions.length === 1) {
		return 0;
	}

	let maxVal = actions[0].value;
	for (let i = 1; i < actions.length; i++) {
		if (actions[i].value > maxVal) {
			maxVal = actions[i].value;
		}
	}

	const exps = actions.map((a) => Math.exp((a.value - maxVal) / temperature));
	const total = exps.reduce((sum, e) => sum + e, 0);

	// Weighted-random pick. `Math.random()` is uniform in `[0, 1)`; we walk
	// the cumulative probability mass and return the first index where the
	// running sum exceeds the roll. Falls back to the last index in the
	// vanishingly unlikely case of floating-point drift leaving `roll` just
	// above `total` after normalisation.
	const roll = Math.random() * total;
	let cumulative = 0;
	for (let i = 0; i < exps.length; i++) {
		cumulative += exps[i];
		if (roll < cumulative) {
			return i;
		}
	}
	return exps.length - 1;
};

export const getActions = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry,
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings
): BrainAction[] => {
	const actions: (BrainAction | null)[] = [
		createPassAction(board, bench, state, personality),
		createBuyXpAction(bench, state, personality, settings),
		createRerollCardsAction(
			board,
			bench,
			pieceRegistry,
			state,
			personality,
			settings
		),
	];

	const {
		cardShop: { cards },
	} = state;

	// create an action to buy every card in the shop
	for (let index = 0; index < cards.length; index++) {
		const card = cards[index];
		actions.push(
			createBuyCardAction(
				board,
				bench,
				pieceRegistry,
				state,
				personality,
				settings,
				index,
				card
			)
		);
	}

	// create a sell action for every piece on the board OR bench
	const allPieceIds = [
		...board.getAllPieces().map((p) => p.id),
		...bench.getAllPieces().map((p) => p.id),
	];
	for (const id of allPieceIds) {
		actions.push(
			createSellPieceAction(board, bench, pieceRegistry, state, personality, id)
		);
	}

	// Drop illegal actions (`null`) and actions below the soft-termination
	// threshold. When every candidate falls below the threshold the filtered
	// array is empty, which makes the preparing-phase loop break via its
	// `actions.length === 0` path — the single termination mechanism for
	// "nothing worth doing right now".
	const filtered = actions.filter(
		(action): action is BrainAction =>
			action !== null && action.value >= BOT_ACTION_THRESHOLD
	);

	// Sort descending by value. With `botSelectionTemperature === 0` this is
	// the full ordering (caller picks `[0]` for deterministic top-1). With a
	// positive temperature, the sort provides the "runner-up" ordering for
	// debug logging; the caller swaps the actual picked action into position 0.
	filtered.sort((a, b) => b.value - a.value);

	const temperature = settings.botSelectionTemperature;
	if (temperature <= 0 || filtered.length <= 1) {
		return filtered;
	}

	// Boltzmann-sample the winner. Swap it into position 0 so the loop's
	// `[mostValuable] = actions` gets the sampled action while the remaining
	// sort order (runners-up) stays intact for debug logging.
	const pickedIndex = softmaxSample(filtered, temperature);
	if (pickedIndex <= 0) {
		return filtered;
	}
	const picked = filtered[pickedIndex];
	filtered.splice(pickedIndex, 1);
	filtered.unshift(picked);
	return filtered;
};
