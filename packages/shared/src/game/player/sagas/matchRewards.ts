import { SagaMiddleware } from "redux-saga";
import { take, takeLatest, put, select, call } from "@redux-saga/core/effects";
import { StreakType } from "@creature-chess/models";

import { PLAYER_FINISH_MATCH_EVENT, PlayerFinishMatchEvent } from "../events";
import { CLEAR_OPPONENT_COMMAND, updateMoneyCommand, updateStreakCommand } from "../playerInfo/commands";
import { addXpCommand } from "./xp";
import { HasPlayerInfo, PlayerStreak } from "../playerInfo/reducer";

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

export const playerMatchRewards = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield takeLatest<PlayerFinishMatchEvent>(
            PLAYER_FINISH_MATCH_EVENT,
            function*({ payload: { homeScore, awayScore } }) {
                const win = homeScore > awayScore;

                yield call(updateStreak, win);

                // wait for preparing phase to give money
                yield take(CLEAR_OPPONENT_COMMAND);

                const currentMoney: number = yield select((state: HasPlayerInfo) => state.playerInfo.money);
                const streak: number = yield select((state: HasPlayerInfo) => state.playerInfo.streak.amount);

                const rewardMoney = getMoneyForMatch(currentMoney, streak, win);

                // todo make addMoneyCommand
                yield put(updateMoneyCommand(currentMoney + rewardMoney));
                yield put(addXpCommand(1));
            }
        )
    });
};
