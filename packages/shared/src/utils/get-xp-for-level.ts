import { MAX_PLAYER_LEVEL } from "@creature-chess/models";

const XP_TO_NEXT_LEVEL = [
    1,
    1,
    2,
    4,
    8,
    16,
    24,
    32,
    40
];

export const getXpToNextLevel = (level: number) => {
    if (level === MAX_PLAYER_LEVEL) {
        return null;
    }

    const result = XP_TO_NEXT_LEVEL[level - 1];

    if (result === undefined) {
        return null;
    }

    return result;
};
