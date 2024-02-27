import { put, call } from "@redux-saga/core/effects";
import { select, take, takeLatest } from "typed-redux-saga";

import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { StreakType, PlayerStreak } from "@creature-chess/models/player";

import { getPlayerEntityDependencies } from "../dependencies";
import {
	playerDeathEvent,
	playerFinishMatchEvent,
	PlayerFinishMatchEvent,
} from "../events";
import { playerInfoCommands } from "../state/commands";
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

const updateStreak = function* (win: boolean) {
	const type = win ? StreakType.WIN : StreakType.LOSS;

	const existingStreak: PlayerStreak = yield select(getPlayerStreak);

	const newAmount =
		type === existingStreak.type ? existingStreak.amount + 1 : 0;

	yield put(
		playerInfoCommands.updateStreakCommand({ type, amount: newAmount })
	);
};

export const playerMatchRewards = function* () {
	const { settings } = yield* getPlayerEntityDependencies();

	yield takeLatest<PlayerFinishMatchEvent>(
		playerFinishMatchEvent.toString(),
		function* ({ payload: { homeScore, awayScore, isHomePlayer } }) {
			const win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;

			yield call(updateStreak, win);

			const enemyPiecesRemaining = isHomePlayer ? awayScore : homeScore;
			const damage = enemyPiecesRemaining * settings.healthLostPerPiece;

			const oldValue = yield* select(getPlayerHealth);

			yield put(subtractHealthCommand(damage));

			// subtractHealthCommand emits an UPDATE_HEALTH_COMMAND so need to wait for that.
			// todo this is ugly
			yield take(playerInfoCommands.updateHealthCommand);

			const newValue = yield* select(getPlayerHealth);

			const justDied = newValue === 0 && oldValue !== 0;
			if (justDied) {
				yield put(playerInfoCommands.updateStatusCommand(PlayerStatus.DEAD));
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
				playerInfoCommands.playerMatchRewardsEvent({
					damage,
					justDied,
					rewardMoney: { total, base, winBonus, streakBonus, interest },
				})
			);
		}
	);
};
