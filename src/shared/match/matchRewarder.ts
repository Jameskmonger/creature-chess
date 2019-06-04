import { Match } from "./match";
import { Player } from "../game/player/player";
import { log } from "../log";

export class MatchRewarder {
    public giveRewards(match: Match) {
        const homePlayer = match.home;

        if (homePlayer.isAlive() === false) {
            return;
        }

        const results = match.getFinalBoard();

        const surviving = {
            home: results.filter(p => p.currentHealth > 0 && p.ownerId === homePlayer.id),
            away: results.filter(p => p.currentHealth > 0 && p.ownerId !== homePlayer.id)
        };

        const win = surviving.home.length > surviving.away.length;

        const money = this.getMoneyForMatch(homePlayer, win);

        homePlayer.addMoney(money);

        homePlayer.addXp(1);
    }

    private getMoneyForMatch(player: Player, win: boolean) {
        const base = 3;
        const winBonus = win ? 1 : 0;
        const streakBonus = this.getNewStreakBonus(player, win);

        const interest = Math.min(Math.floor(player.getMoney() / 10), 5);

        const total = base + winBonus + streakBonus + interest;

        log(`${player.name} just earned $${total}`);
        log(` - base: ${base}`);
        log(` - win bonus: ${winBonus}`);
        log(` - streak (${player.streak.amount}) bonus: ${streakBonus}`);
        log(` - interest: ${interest}`);

        return total;
    }

    private getNewStreakBonus(player: Player, win: boolean) {
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
    }

}
