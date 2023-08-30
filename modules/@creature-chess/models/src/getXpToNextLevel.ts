import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

const LOWER_XP = true;

const XP_TO_NEXT_LEVEL = LOWER_XP
	? [1, 1, 2, 4, 8, 13, 18, 24, 30]
	: [1, 1, 2, 4, 8, 16, 24, 32, 40];

export const getXpToNextLevel = (level: number) => {
	if (level === DEFAULT_GAME_OPTIONS.game.maxLevel) {
		return 0;
	}

	const result = XP_TO_NEXT_LEVEL[level - 1];

	if (result === undefined) {
		return 0;
	}

	return result;
};
