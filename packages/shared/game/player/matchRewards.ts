const getStreakBonus = (streak: number) => {
    if (streak >= 9) {
        return 3;
    }

    if (streak >= 6) {
        return 2;
    }

    if (streak >= 3) {
        return 1;
    }

    return 0;
};

export const getMoneyForMatch = (currentMoney: number, streak: number, win: boolean) => {
    const base = 3;
    const winBonus = win ? 1 : 0;
    const streakBonus = getStreakBonus(streak);

    const interest = Math.min(Math.floor(currentMoney / 10), 5);

    const total = base + winBonus + streakBonus + interest;

    return total;
};
