import { BoardSelectors } from "@shoki/board";

import { PlayerState } from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { MAX_LEVEL } from "@creature-chess/models/config";
import { GamemodeSettings } from "@creature-chess/models/settings";

// don't go under this amount
const MINIMUM_MONEY = 10;
const MINIMUM_MONEY_IF_NEXT_LEVEL_PRACTICAL = 5;

export const shouldBuyXp = (
	state: PlayerState,
	settings: GamemodeSettings
): boolean => {
	const benchPieces = BoardSelectors.getAllPieces(state.bench);
	const hasPieceOnBench = benchPieces.length >= 1;
	const {
		playerInfo: { money, level, xp },
	} = state;

	if (level === MAX_LEVEL) {
		return false;
	}

	const xpForNextLevel = getXpToNextLevel(level);

	if (xpForNextLevel === null) {
		return false;
	}

	const xpRequired = xpForNextLevel - xp;
	const purchasesRequired = Math.ceil(xpRequired / settings.buyXpAmount);
	const cost = purchasesRequired * settings.buyXpCost;

	if (purchasesRequired === 1 && hasPieceOnBench) {
		return money - cost >= MINIMUM_MONEY_IF_NEXT_LEVEL_PRACTICAL;
	}

	return money - cost >= MINIMUM_MONEY;
};
