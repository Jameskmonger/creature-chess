import { BotAction, BotActions, PreparingPhaseContext } from "@cc-server/bot";

import { collectAllPieces, completionProgress, sharesTrait } from "../cards";
import { effectiveAmbition, isInPanicMode, Personality } from "../personality";

const MONEY_FLOOR = 10;

export const decideReroll = (
	ctx: PreparingPhaseContext,
	personality: Personality
): BotAction | null => {
	const { board, bench, pieceRegistry, player, settings } = ctx;
	const money = player.money;

	if (money < settings.rerollCost) {
		return null;
	}

	const cards = player.cards;
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
	const floor = isInPanicMode(player, personality) ? 0 : MONEY_FLOOR;

	if (
		effectiveAmbition(player, personality) === "high" &&
		moneyAfter >= floor
	) {
		return BotActions.rerollCards();
	}

	return null;
};
