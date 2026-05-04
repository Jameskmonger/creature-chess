import { Action } from "redux";

import {
	getXpToNextLevel,
	PlayerStateSelectors,
} from "@creature-chess/gamemode";
import { MAX_LEVEL } from "@creature-chess/models";

import { BotActions, PreparingPhaseContext } from "@cc-server/bot";

import {
	effectiveAmbition,
	isInPanicMode,
	Personality,
} from "../personality";

const MONEY_FLOOR = 10;
const ROUND_FLOOR = 4;

export const decideBuyXp = (
	ctx: PreparingPhaseContext,
	personality: Personality
): Action | null => {
	const { state, settings } = ctx;
	const level = PlayerStateSelectors.getPlayerLevel(state);
	const money = PlayerStateSelectors.getPlayerMoney(state);

	if (level >= MAX_LEVEL) {
		return null;
	}
	if (money < settings.buyXpCost) {
		return null;
	}
	if (state.roundInfo.round < ROUND_FLOOR) {
		return null;
	}

	const xpRemaining = Math.max(
		1,
		getXpToNextLevel(level) - PlayerStateSelectors.getPlayerXp(state)
	);
	// Closing out a level is always worth it — the extra board slot pays for itself.
	if (settings.buyXpAmount >= xpRemaining) {
		return BotActions.buyXp();
	}

	const moneyAfter = money - settings.buyXpCost;
	const floor = isInPanicMode(state, personality) ? 0 : MONEY_FLOOR;

	if (
		effectiveAmbition(state, personality) === "high" &&
		moneyAfter >= floor
	) {
		return BotActions.buyXp();
	}

	return null;
};
