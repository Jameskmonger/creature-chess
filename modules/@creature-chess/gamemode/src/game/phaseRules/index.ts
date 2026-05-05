import { finishedBattle, inProgressBattle, StreakType } from "@creature-chess/models";

import { runEvolutions } from "../../entities/player/operations/evolution";
import { fillBoard } from "../../entities/player/operations/fillBoard";
import { Player } from "../../entities/player/player";
import { Match } from "../match";

/**
 * Per-phase consequences applied to a Player as a Round progresses.
 *
 * One implementation; called procedurally by the Round orchestration. The
 * previous Redux listener cascade for phase events lived in nine listener
 * files — those bodies are inlined here.
 */
export interface PhaseRules {
	onPreparingPhaseStart(player: Player): void;
	onBeforeReadyPhaseStart(player: Player): void;
	onReadyPhaseStart(player: Player, match: Match): void;
	onMatchSettled(
		player: Player,
		payload: { homeScore: number; awayScore: number; isHomePlayer: boolean }
	): void;
}

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

const getMoneyForMatch = (
	currentMoney: number,
	streak: number,
	win: boolean
) => {
	const base = 3;
	const winBonus = win ? 1 : 0;
	const streakBonus = getStreakBonus(streak);
	const interest = Math.min(Math.floor(currentMoney / 10), 5);
	const total = base + winBonus + streakBonus + interest;
	return { total, base, winBonus, streakBonus, interest };
};

export const phaseRules: PhaseRules = {
	onPreparingPhaseStart(player) {
		if (!player.alive) {
			return;
		}

		runEvolutions(player);

		const matchRewards = player.matchRewards;

		if (matchRewards) {
			player.addMoney(matchRewards.rewardMoney.total);
			player.addXp(1);
		}

		if (!player.shopLocked) {
			player.emitRerollCards();
		}

		player.setShopLocked(false);

		if (matchRewards) {
			player.setMatchRewards(null);
			player.setOpponent({ id: null });
		}
	},

	onBeforeReadyPhaseStart(player) {
		fillBoard(player);
		player.setReady(false);
	},

	onReadyPhaseStart(player, match) {
		player.match = match;

		const isHomePlayer = match.home.id === player.id;
		const opponentId = isHomePlayer ? match.away.id : match.home.id;
		const opponentIsClone = isHomePlayer ? match.awayIsClone : false;

		player.setOpponent({ id: opponentId, isClone: opponentIsClone });
		player.setBattle(inProgressBattle(opponentId, opponentIsClone));
	},

	onMatchSettled(player, { homeScore, awayScore, isHomePlayer }) {
		player.match = null;

		const opponentId = player.opponentId;
		const opponentIsClone = player.opponentIsClone;

		player.setBattle(
			finishedBattle(
				opponentId!,
				opponentIsClone,
				isHomePlayer,
				homeScore,
				awayScore
			)
		);

		const win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;

		const existingStreak = player.streak;
		const streakType = win ? StreakType.WIN : StreakType.LOSS;
		const streakAmount =
			streakType === existingStreak.type ? existingStreak.amount + 1 : 0;
		player.setStreak({ type: streakType, amount: streakAmount });

		const enemyPiecesRemaining = isHomePlayer ? awayScore : homeScore;
		const damage = enemyPiecesRemaining * player.settings.healthLostPerPiece;

		const justDied = player.reduceHealth(damage);
		if (justDied) {
			player.eliminate();
		}

		const rewardMoney = getMoneyForMatch(player.money, player.streak.amount, win);

		player.setMatchRewards({
			damage,
			justDied,
			rewardMoney,
		});
	},
};
