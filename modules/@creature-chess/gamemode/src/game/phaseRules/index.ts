import {
	finishedBattle,
	inProgressBattle,
	PlayerStatus,
	StreakType,
} from "@creature-chess/models";

import {
	afterRerollCardsEvent,
	playerDeathEvent,
} from "../../entities/player/events";
import { drainPendingEvolutionChecks } from "../../entities/player/operations/evolution";
import { fillBoard } from "../../entities/player/operations/fillBoard";
import { addXp } from "../../entities/player/operations/xp";
import { Player } from "../../entities/player/player";
import {
	playerInfoCommands,
	updateShopLockCommand,
} from "../../entities/player/state/commands";
import {
	getOpponentId,
	getOpponentIsClone,
	getPlayerHealth,
	getPlayerMoney,
	getPlayerStreak,
	isPlayerAlive,
	isPlayerShopLocked,
} from "../../entities/player/state/selectors";
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
		if (!isPlayerAlive(player.select((s) => s))) {
			return;
		}

		drainPendingEvolutionChecks(player);

		const matchRewards = player.select((s) => s.playerInfo.matchRewards);

		if (matchRewards) {
			const currentMoney = getPlayerMoney(player.select((s) => s));
			player.put(
				playerInfoCommands.updateMoneyCommand(
					currentMoney + matchRewards.rewardMoney.total
				)
			);
			addXp(player, 1);
		}

		const locked = isPlayerShopLocked(player.select((s) => s));

		if (!locked) {
			player.put(afterRerollCardsEvent());
		}

		player.put(updateShopLockCommand(false));

		if (matchRewards) {
			player.put(playerInfoCommands.playerMatchRewardsEvent(null));
			player.put(playerInfoCommands.updateOpponentCommand({ id: null }));
		}
	},

	onBeforeReadyPhaseStart(player) {
		fillBoard(player);
		player.put(playerInfoCommands.updateReadyCommand(false));
	},

	onReadyPhaseStart(player, match) {
		player.match = match;

		const isHomePlayer = match.home.id === player.id;
		const opponentId = isHomePlayer ? match.away.id : match.home.id;
		const opponentIsClone = isHomePlayer ? match.awayIsClone : false;

		player.put(
			playerInfoCommands.updateOpponentCommand({
				id: opponentId,
				isClone: opponentIsClone,
			})
		);
		player.put(
			playerInfoCommands.updateBattleCommand(
				inProgressBattle(opponentId, opponentIsClone ?? false)
			)
		);
	},

	onMatchSettled(player, { homeScore, awayScore, isHomePlayer }) {
		player.match = null;

		const opponentId = getOpponentId(player.select((s) => s));
		const opponentIsClone = getOpponentIsClone(player.select((s) => s));

		player.put(
			playerInfoCommands.updateBattleCommand(
				finishedBattle(
					opponentId!,
					opponentIsClone,
					isHomePlayer,
					homeScore,
					awayScore
				)
			)
		);

		const win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;

		const existingStreak = getPlayerStreak(player.select((s) => s));
		const streakType = win ? StreakType.WIN : StreakType.LOSS;
		const streakAmount =
			streakType === existingStreak.type ? existingStreak.amount + 1 : 0;
		player.put(
			playerInfoCommands.updateStreakCommand({
				type: streakType,
				amount: streakAmount,
			})
		);

		const enemyPiecesRemaining = isHomePlayer ? awayScore : homeScore;
		const damage = enemyPiecesRemaining * player.settings.healthLostPerPiece;

		const oldHealth = getPlayerHealth(player.select((s) => s));
		const newHealth = Math.max(0, oldHealth - damage);
		player.put(playerInfoCommands.updateHealthCommand(newHealth));

		const justDied = newHealth === 0 && oldHealth !== 0;
		if (justDied) {
			player.put(playerInfoCommands.updateStatusCommand(PlayerStatus.DEAD));
			player.put(playerDeathEvent());
		}

		const currentMoney = getPlayerMoney(player.select((s) => s));
		const streak = getPlayerStreak(player.select((s) => s));
		const rewardMoney = getMoneyForMatch(currentMoney, streak.amount, win);

		player.put(
			playerInfoCommands.playerMatchRewardsEvent({
				damage,
				justDied,
				rewardMoney,
			})
		);
	},
};
