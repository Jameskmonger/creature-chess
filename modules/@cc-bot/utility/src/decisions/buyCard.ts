import { Action } from "redux";

import { PlayerState, PlayerStateSelectors } from "@creature-chess/gamemode";
import { Card, PieceModel } from "@creature-chess/models";

import { BotActions, PreparingPhaseContext } from "@cc-server/bot";

import { collectAllPieces, completionProgress, sharesTrait } from "../cards";
import {
	effectiveAmbition,
	isInPanicMode,
	Personality,
} from "../personality";

const MONEY_FLOOR = 10;

type CardQuality = "completion" | "progress" | "synergy" | "filler";

const QUALITY_RANK: Record<CardQuality, number> = {
	completion: 4,
	progress: 3,
	synergy: 2,
	filler: 1,
};

const scoreCard = (allPieces: PieceModel[], card: Card): CardQuality => {
	const progress = completionProgress(allPieces, card);
	if (progress >= 2) {
		return "completion";
	}
	if (progress >= 1) {
		return "progress";
	}
	if (sharesTrait(allPieces, card)) {
		return "synergy";
	}
	return "filler";
};

const willBuy = (
	quality: CardQuality,
	personality: Personality,
	state: PlayerState,
	shortOnPieces: boolean
): boolean => {
	if (quality === "completion") {
		return true;
	}
	if (effectiveAmbition(state, personality) === "high") {
		return true;
	}
	// Readying up with a half-empty board is a guaranteed loss.
	if (shortOnPieces) {
		return true;
	}
	if (quality === "progress") {
		return true;
	}
	if (quality === "synergy") {
		return personality.vision === "high";
	}
	return false;
};

const passesMoneyFloor = (
	quality: CardQuality,
	personality: Personality,
	state: PlayerState,
	shortOnPieces: boolean,
	moneyAfter: number
): boolean => {
	if (quality === "completion" || shortOnPieces) {
		return true;
	}
	if (effectiveAmbition(state, personality) === "high") {
		return true;
	}
	if (isInPanicMode(state, personality)) {
		return true;
	}
	return moneyAfter >= MONEY_FLOOR;
};

export const decideBuyCard = (
	ctx: PreparingPhaseContext,
	personality: Personality
): Action | null => {
	const { board, bench, pieceRegistry, state, settings } = ctx;
	const money = PlayerStateSelectors.getPlayerMoney(state);
	const level = PlayerStateSelectors.getPlayerLevel(state);
	const cards = state.cardShop.cards;

	const allPieces = collectAllPieces(board, bench, pieceRegistry);
	const totalPieces = allPieces.length;
	const maxPieces = level + settings.benchSize;

	if (totalPieces >= maxPieces) {
		return null;
	}

	const shortOnPieces = totalPieces < level;

	const ranked = cards
		.map((card, index) => ({ card, index }))
		.filter(
			(c): c is { card: Card; index: number } =>
				c.card !== null && c.card.cost <= money
		)
		.map((c) => ({
			...c,
			quality: scoreCard(allPieces, c.card),
		}))
		.sort((a, b) => QUALITY_RANK[b.quality] - QUALITY_RANK[a.quality]);

	for (const { card, index, quality } of ranked) {
		if (!willBuy(quality, personality, state, shortOnPieces)) {
			continue;
		}
		const moneyAfter = money - card.cost;
		if (
			!passesMoneyFloor(
				quality,
				personality,
				state,
				shortOnPieces,
				moneyAfter
			)
		) {
			continue;
		}
		return BotActions.buyCard(index);
	}

	return null;
};
