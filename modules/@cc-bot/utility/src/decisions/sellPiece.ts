import { Action } from "redux";

import { PlayerStateSelectors } from "@creature-chess/gamemode";
import { getDefinitionById, PieceModel } from "@creature-chess/models";

import { BotActions, PreparingPhaseContext } from "@cc-server/bot";

import { collectAllPieces } from "../cards";
import { Personality } from "../personality";

export const decideSellPiece = (
	ctx: PreparingPhaseContext,
	personality: Personality
): Action | null => {
	const { board, bench, pieceRegistry, state, settings } = ctx;
	const allPieces = collectAllPieces(board, bench, pieceRegistry);
	const level = PlayerStateSelectors.getPlayerLevel(state);
	const maxPieces = level + settings.benchSize;

	// Only sell to free room when board+bench is full.
	if (allPieces.length < maxPieces) {
		return null;
	}
	// Placement needs at least `level` pieces to keep the board full.
	if (allPieces.length - 1 < level) {
		return null;
	}

	const sameDefStage0 = (piece: PieceModel) =>
		allPieces.filter(
			(p) => p.definitionId === piece.definitionId && p.stage === 0
		).length;

	const ownedTraitCounts = countTraits(allPieces);
	const isUniqueTraitCarrier = (piece: PieceModel) =>
		piece.traits.some((t) => (ownedTraitCounts.get(t) ?? 0) <= 1);

	const sellable = allPieces.filter((piece) => {
		if (sameDefStage0(piece) >= 2) {
			return false;
		}
		if (personality.vision === "high" && isUniqueTraitCarrier(piece)) {
			return false;
		}
		return true;
	});

	if (sellable.length === 0) {
		return null;
	}

	const cheapest = pickCheapest(sellable);
	if (!cheapest) {
		return null;
	}

	return BotActions.sellPiece(cheapest.id);
};

const countTraits = (pieces: PieceModel[]): Map<string, number> => {
	const counts = new Map<string, number>();
	for (const p of pieces) {
		for (const t of p.traits) {
			counts.set(t, (counts.get(t) ?? 0) + 1);
		}
	}
	return counts;
};

const pickCheapest = (pieces: PieceModel[]): PieceModel | null => {
	let best: PieceModel | null = null;
	let bestCost = Infinity;
	for (const p of pieces) {
		const def = getDefinitionById(p.definitionId);
		const cost = def?.cost ?? 0;
		if (cost < bestCost) {
			best = p;
			bestCost = cost;
		}
	}
	return best;
};
