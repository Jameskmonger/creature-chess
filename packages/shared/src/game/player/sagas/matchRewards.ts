import { take, takeLatest, put, select, call } from "@redux-saga/core/effects";
import { HEALTH_LOST_PER_PIECE, StreakType } from "@creature-chess/models";

import { PLAYER_FINISH_MATCH_EVENT, PlayerFinishMatchEvent, playerMatchRewardsEvent } from "../events";
import { CLEAR_OPPONENT_COMMAND, updateMoneyCommand, updateRoundDiedAtCommand, updateStreakCommand, UPDATE_HEALTH_COMMAND } from "../playerInfo/commands";
import { addXpCommand } from "./xp";
import { HasPlayerInfo, PlayerStreak } from "../playerInfo/reducer";
import { subtractHealthCommand } from "./health";
import { GameState } from "../../store";

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

const getMoneyForMatch = (currentMoney: number, streak: number, win: boolean) => {
    const base = 3;
    const winBonus = win ? 1 : 0;
    const streakBonus = getStreakBonus(streak);

    const interest = Math.min(Math.floor(currentMoney / 10), 5);

    const total = base + winBonus + streakBonus + interest;

    return total;
};

const updateStreak = function*(win: boolean) {
    const type = win ? StreakType.WIN : StreakType.LOSS;

    const existingStreak: PlayerStreak = yield select((state: HasPlayerInfo) => state.playerInfo.streak);

    const newAmount = (type === existingStreak.type) ? existingStreak.amount + 1 : 0;

    yield put(updateStreakCommand(type, newAmount));
}

export const playerMatchRewards = <TState extends (HasPlayerInfo & { game: GameState })>(playerId: string) => {
    return function*() {
        yield takeLatest<PlayerFinishMatchEvent>(
            PLAYER_FINISH_MATCH_EVENT,
            function*({ payload: { homeScore, awayScore } }) {
                const win = homeScore > awayScore;

                yield call(updateStreak, win);

                const damage = awayScore * HEALTH_LOST_PER_PIECE;

                const oldValue: number = yield select(({ playerInfo: { health } }: TState) => health);

                yield put(subtractHealthCommand(damage));

                // subtractHealthCommand emits an UPDATE_HEALTH_COMMAND so need to wait for that.
                // todo this is ugly
                yield take(UPDATE_HEALTH_COMMAND);

                const newValue: number = yield select(({ playerInfo: { health } }: TState) => health);

                const justDied = (newValue === 0 && oldValue !== 0);
                if (justDied) {
                    const currentRound: number = yield select(({ game: { round } }: TState) => round);

                    yield put(updateRoundDiedAtCommand(currentRound));
                }

                const currentMoney: number = yield select(({ playerInfo: { money } }: TState) => money);
                const streak: number = yield select(({ playerInfo: { streak: { amount } } }: TState) => amount);

                const rewardMoney = getMoneyForMatch(currentMoney, streak, win);

                yield put(playerMatchRewardsEvent({
                    damage,
                    justDied,
                    rewardMoney
                }));

                // wait for preparing phase to give money
                yield take(CLEAR_OPPONENT_COMMAND);

                yield put(playerMatchRewardsEvent(null));

                // todo make addMoneyCommand
                yield put(updateMoneyCommand(currentMoney + rewardMoney));
                yield put(addXpCommand(1));
            }
        )
    };
};
