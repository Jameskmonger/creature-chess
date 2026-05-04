import { Action } from "redux";

import { PlayerStateSelectors } from "@creature-chess/gamemode";

import { BotActions, PreparingPhaseContext } from "@cc-server/bot";

import { collectAllPieces, completionProgress, sharesTrait } from "../cards";
import {
	effectiveAmbition,
	isInPanicMode,
	Personality,
} from "../personality";

const MONEY_FLOOR = 10;

export const decideReroll = (
	ctx: PreparingPhaseContext,
	personality: Personality
): Action | null => {
	const { board, bench, pieceRegistry, state, settings } = ctx;
	const money = PlayerStateSelectors.getPlayerMoney(state);

	if (money < settings.rerollCost) {
		return null;
	}

	const cards = PlayerStateSelectors.getPlayerCards(state);
	const allPieces = collectAllPieces(board, bench, pieceRegistry);

	const shopHasWantedCard = cards.some(
		(c) =>
			c !== null &&
			(allPieces.length === 0 ||
				completionProgress(allPieces, c) > 0 ||
				sharesTrait(allPieces, c))
	);
	if (shopHasWantedCard) {
		return null;
	}

	const moneyAfter = money - settings.rerollCost;
	const floor = isInPanicMode(state, personality) ? 0 : MONEY_FLOOR;

	if (
		effectiveAmbition(state, personality) === "high" &&
		moneyAfter >= floor
	) {
		return BotActions.rerollCards();
	}

	return null;
};
