import {
	finishedBattle,
	inProgressBattle,
	PlayerStreak,
	StreakType,
} from "@creature-chess/models";

import { runEvolutions } from "../../entities/player/operations/evolution";
import { fillBoard } from "../../entities/player/operations/fillBoard";
import { Player } from "../../entities/player/player";
import { PlayerMatchRewards } from "../../entities/player/state/playerInfo";
import { Match } from "../match";

/**
 * The Round-side of a Player: the work the Round commands at each phase
 * boundary.
 *
 * The Round calls them in the following order: `prepare`, `deploy`, `engage`, `settle`.
 */
export interface PlayerRound {
	prepare(player: Player): void;
	deploy(player: Player): void;
	engage(player: Player, match: Match): void;
	settle(player: Player, outcome: MatchOutcome): void;
}

export type MatchOutcome = {
	homeScore: number;
	awayScore: number;
	isHomePlayer: boolean;
};

const advanceStreak = (current: PlayerStreak, win: boolean): PlayerStreak => {
	const type = win ? StreakType.WIN : StreakType.LOSS;
	return {
		type,
		amount: type === current.type ? current.amount + 1 : 0,
	};
};

const streakBonus = (streakAmount: number) => {
	if (streakAmount >= 9) {
		return 3;
	}

	if (streakAmount >= 6) {
		return 2;
	}

	if (streakAmount >= 3) {
		return 1;
	}

	return 0;
};

const computeMatchRewards = (
	currentMoney: number,
	streakAmount: number,
	win: boolean
): PlayerMatchRewards["rewardMoney"] => {
	const base = 3;
	const winBonus = win ? 1 : 0;
	const streak = streakBonus(streakAmount);
	const interest = Math.min(Math.floor(currentMoney / 10), 5);
	return {
		total: base + winBonus + streak + interest,
		base,
		winBonus,
		streakBonus: streak,
		interest,
	};
};

export const playerRound: PlayerRound = {
	prepare(player) {
		if (!player.alive) {
			return;
		}

		runEvolutions(player);

		const { matchRewards } = player;
		if (matchRewards) {
			player.addMoney(matchRewards.rewardMoney.total);
			player.addXp(1);
			player.setMatchRewards(null);
			player.setOpponent({ id: null });
		}

		if (!player.shopLocked) {
			player.emitRerollCards();
		}
		player.setShopLocked(false);
	},

	deploy(player) {
		fillBoard(player);
		player.setReady(false);
	},

	engage(player, match) {
		const isHomePlayer = match.home.id === player.id;
		const opponentId = isHomePlayer ? match.away.id : match.home.id;
		const opponentIsClone = isHomePlayer && match.awayIsClone;

		player.match = match;
		player.setOpponent({ id: opponentId, isClone: opponentIsClone });
		player.setBattle(inProgressBattle(opponentId, opponentIsClone));
	},

	settle(player, { homeScore, awayScore, isHomePlayer }) {
		const win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;
		const enemyPiecesRemaining = isHomePlayer ? awayScore : homeScore;
		const damage = enemyPiecesRemaining * player.settings.healthLostPerPiece;

		player.match = null;
		player.setBattle(
			finishedBattle(
				player.opponentId!,
				player.opponentIsClone,
				isHomePlayer,
				homeScore,
				awayScore
			)
		);
		player.setStreak(advanceStreak(player.streak, win));

		const wasAlive = player.alive;
		player.reduceHealth(damage);

		player.setMatchRewards({
			damage,
			justDied: wasAlive && !player.alive,
			rewardMoney: computeMatchRewards(player.money, player.streak.amount, win),
		});
	},
};
