import { MAX_LEVEL } from "@creature-chess/models/config";

// TODO jkm - make this configurable
// XP used to be [1, 1, 2, 4, 8, 16, 24, 32, 40];
const XP_TO_NEXT_LEVEL = [1, 1, 2, 4, 8, 13, 18, 24, 30];

export const getXpToNextLevel = (level: number) => {
	if (level === MAX_LEVEL) {
		return 0;
	}

	const result = XP_TO_NEXT_LEVEL[level - 1];

	if (result === undefined) {
		return 0;
	}

	return result;
};
