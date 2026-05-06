import { Action } from "redux";

import { getXpToNextLevel } from "@creature-chess/gamemode";
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
	const { player, settings } = ctx;
	const level = player.level;
	const money = player.money;

	if (level >= MAX_LEVEL) {
		return null;
	}
	if (money < settings.buyXpCost) {
		return null;
	}
	if (player.gamemode.getRoundInfo().round < ROUND_FLOOR) {
		return null;
	}

	const xpRemaining = Math.max(1, getXpToNextLevel(level) - player.xp);
	// Closing out a level is always worth it — the extra board slot pays for itself.
	if (settings.buyXpAmount >= xpRemaining) {
		return BotActions.buyXp();
	}

	const moneyAfter = money - settings.buyXpCost;
	const floor = isInPanicMode(player, personality) ? 0 : MONEY_FLOOR;

	if (
		effectiveAmbition(player, personality) === "high" &&
		moneyAfter >= floor
	) {
		return BotActions.buyXp();
	}

	return null;
};
