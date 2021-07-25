import { BUY_XP_AMOUNT, BUY_XP_COST, MAX_PLAYER_LEVEL, getXpToNextLevel } from "@creature-chess/models";
import { PlayerState } from "@creature-chess/gamemode";

// don't go under this amount
const MINIMUM_MONEY = 10;

export const shouldBuyXp = (state: PlayerState): boolean => {
	const { playerInfo: { money, level, xp } } = state;

	if (level === MAX_PLAYER_LEVEL) {
		return false;
	}

	const xpForNextLevel = getXpToNextLevel(level);

	if (xpForNextLevel === null) {
		return false;
	}

	const xpRequired = xpForNextLevel - xp;
	const purchasesRequired = Math.ceil(xpRequired / BUY_XP_AMOUNT);
	const cost = purchasesRequired * BUY_XP_COST;

	return (money - cost) >= MINIMUM_MONEY;
};
