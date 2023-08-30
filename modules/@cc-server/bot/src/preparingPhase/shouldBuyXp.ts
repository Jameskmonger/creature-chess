import { BoardSelectors } from "@shoki/board";

import { PlayerState } from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

// don't go under this amount
const MINIMUM_MONEY = 10;
const MINIMUM_MONEY_IF_NEXT_LEVEL_PRACTICAL = 5;

export const shouldBuyXp = (state: PlayerState): boolean => {
	const benchPieces = BoardSelectors.getAllPieces(state.bench);
	const hasPieceOnBench = benchPieces.length >= 1;
	const {
		playerInfo: { money, level, xp },
	} = state;

	if (level === DEFAULT_GAME_OPTIONS.game.maxLevel) {
		return false;
	}

	const xpForNextLevel = getXpToNextLevel(level);

	if (xpForNextLevel === null) {
		return false;
	}

	const xpRequired = xpForNextLevel - xp;
	const purchasesRequired = Math.ceil(xpRequired / DEFAULT_GAME_OPTIONS.game.buyXpAmount);
	const cost = purchasesRequired * DEFAULT_GAME_OPTIONS.game.buyXpCost;

	if (purchasesRequired === 1 && hasPieceOnBench) {
		return money - cost >= MINIMUM_MONEY_IF_NEXT_LEVEL_PRACTICAL;
	}

	return money - cost >= MINIMUM_MONEY;
};
