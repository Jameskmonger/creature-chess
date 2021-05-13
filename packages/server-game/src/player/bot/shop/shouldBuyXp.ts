import { BUY_XP_AMOUNT, BUY_XP_COST, MAX_PLAYER_LEVEL, getXpToNextLevel } from "@creature-chess/models";

// don't go under this amount
const MINIMUM_MONEY = 10;

export const shouldBuyXp = (money: number, level: number, xp: number): boolean => {
	if (level === MAX_PLAYER_LEVEL) {
		return false;
	}

	const xpRequired = getXpToNextLevel(level) - xp;
	const purchasesRequired = Math.ceil(xpRequired / BUY_XP_AMOUNT);
	const cost = purchasesRequired * BUY_XP_COST;

	return (money - cost) >= MINIMUM_MONEY;
};
