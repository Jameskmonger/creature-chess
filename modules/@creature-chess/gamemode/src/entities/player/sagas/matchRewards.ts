import { take, takeLatest, put, call } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";

import { StreakType, PlayerStreak } from "@creature-chess/models/player";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";
import { PlayerStatus } from "@creature-chess/models/game/playerList";

import {
	playerMatchRewardsEvent,
	playerDeathEvent,
	playerFinishMatchEvent,
	PlayerFinishMatchEvent,
} from "../events";
import {
	updateStreakCommand,
	updateHealthCommand,
	updateStatusCommand,
} from "../state/commands";
import {
	getPlayerHealth,
	getPlayerMoney,
	getPlayerStreak,
} from "../state/selectors";
import { subtractHealthCommand } from "./health";

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

const updateStreak = function*(win: boolean) {
	const type = win ? StreakType.WIN : StreakType.LOSS;

	const existingStreak: PlayerStreak = yield select(getPlayerStreak);

	const newAmount =
		type === existingStreak.type ? existingStreak.amount + 1 : 0;

	yield put(updateStreakCommand({ type, amount: newAmount }));
};

export const playerMatchRewards = function*() {
	yield takeLatest<PlayerFinishMatchEvent>(
		playerFinishMatchEvent.toString(),
		function*({ payload: { homeScore, awayScore, isHomePlayer } }) {
			const win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;

			yield call(updateStreak, win);

			const enemyPiecesRemaining = isHomePlayer ? awayScore : homeScore;
			const damage = enemyPiecesRemaining * DEFAULT_GAME_OPTIONS.game.healthLostPerPiece;

			const oldValue = yield* select(getPlayerHealth);

			yield put(subtractHealthCommand(damage));

			// subtractHealthCommand emits an UPDATE_HEALTH_COMMAND so need to wait for that.
			// todo this is ugly
			yield take(updateHealthCommand.toString());

			const newValue = yield* select(getPlayerHealth);

			const justDied = newValue === 0 && oldValue !== 0;
			if (justDied) {
				yield put(updateStatusCommand(PlayerStatus.DEAD));
				yield put(playerDeathEvent());
			}

			const currentMoney = yield* select(getPlayerMoney);
			const streak = yield* select(getPlayerStreak);

			const { total, base, winBonus, streakBonus, interest } = getMoneyForMatch(
				currentMoney,
				streak.amount,
				win
			);

			yield put(
				playerMatchRewardsEvent({
					damage,
					justDied,
					rewardMoney: { total, base, winBonus, streakBonus, interest },
				})
			);
		}
	);
};
