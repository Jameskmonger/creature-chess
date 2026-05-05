import { BotImplementation, PreparingPhaseContext } from "@cc-server/bot";

import { decideBuyCard } from "./decisions/buyCard";
import { decideBuyXp } from "./decisions/buyXp";
import { decideReroll } from "./decisions/reroll";
import { decideSellPiece } from "./decisions/sellPiece";
import { Personality } from "./personality";
import { nextPlacementAction } from "./placement";

export const createUtilityBot = (
	personality: Personality
): BotImplementation => ({
	decidePreparingAction: (ctx: PreparingPhaseContext) => {
		const placement = nextPlacementAction(ctx);
		if (placement) {
			return placement;
		}

		const buy = decideBuyCard(ctx, personality);
		if (buy) {
			return buy;
		}

		const xp = decideBuyXp(ctx, personality);
		if (xp) {
			return xp;
		}

		const reroll = decideReroll(ctx, personality);
		if (reroll) {
			return reroll;
		}

		const sell = decideSellPiece(ctx, personality);
		if (sell) {
			return sell;
		}

		// Don't ready up with a half-empty board — force a forgiving
		// buyCard pass so we field at least `level` pieces.
		if (mustKeepActing(ctx)) {
			return decideBuyCard(ctx, { ...personality, ambition: "high" });
		}

		return null;
	},
});

const mustKeepActing = (ctx: PreparingPhaseContext): boolean => {
	const { board, bench, state } = ctx;

	const totalPieces =
		board.getAllPieces().length + bench.getAllPieces().length;

	return totalPieces < state.playerInfo.level;
};
