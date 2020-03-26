import { EventManager } from "../events/eventManager";
import { Player } from "../player/player";
import { log } from "../../log";
import { GamePlugin } from "./gamePlugin";

const getNewStreakBonus = (player: Player, win: boolean) => {
    player.adjustStreak(win);

    if (player.streak.amount >= 9) {
        return 3;
    }

    if (player.streak.amount >= 6) {
        return 2;
    }

    if (player.streak.amount >= 3) {
        return 1;
    }

    return 0;
};

const getMoneyForMatch = (player: Player, win: boolean) => {
    const base = 3;
    const winBonus = win ? 1 : 0;
    const streakBonus = getNewStreakBonus(player, win);

    const interest = Math.min(Math.floor(player.getMoney() / 10), 5);

    const total = base + winBonus + streakBonus + interest;

    return total;
};

export const matchRewards: GamePlugin = (eventManager: EventManager) => {
    eventManager.onFinishRound((players: Player[]) => {
        players
            .filter(player => player.isAlive())
            .forEach(player => {
                const match = player.getMatch();

                const results = match.getFinalBoard();

                const pieces = Object.values(results.pieces);
                const surviving = {
                    home: pieces.filter(p => p.currentHealth > 0 && p.ownerId === player.id),
                    away: pieces.filter(p => p.currentHealth > 0 && p.ownerId !== player.id)
                };

                const win = surviving.home.length > surviving.away.length;

                const money = getMoneyForMatch(player, win);

                player.addMoney(money);

                player.addXp(1);
            });
    });
};
