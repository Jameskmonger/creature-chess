import { Match } from "./match";
import { Player } from "../game/player/player";
import { log } from "../log";

export class MatchRewarder {
    public giveRewards(match: Match) {
        const homePlayer = match.home;

        if (homePlayer.isAlive() === false) {
            return;
        }

        const results = match.getResults();

        const win = results.home.length > results.away.length;

        const money = this.getMoneyForMatch(homePlayer, win);

        homePlayer.addMoney(money);

        homePlayer.addXp(1);
    }

    private getMoneyForMatch(player: Player, win: boolean) {
        const base = 3;
        const winBonus = win ? 1 : 0;
        const streakBonus = this.getNewStreakBonus(player, win);

        const total = base + winBonus + streakBonus;

        log(`${player.name} just earned $${total} (base: ${base}, win bonus: ${winBonus}, (${player.streak.amount}) streak bonus: ${streakBonus})`);

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
