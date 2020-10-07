import { SagaMiddleware } from "redux-saga";
import { take, takeLatest, put, select } from "@redux-saga/core/effects";

import { PLAYER_FINISH_MATCH, PlayerFinishMatchAction } from "../actions";
import { CLEAR_OPPONENT, moneyUpdateAction } from "../playerInfo/actions";
import { PlayerState } from "../store";
import { addXpCommand } from "./xp";

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

export const playerMatchRewards = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield takeLatest<PlayerFinishMatchAction>(
            PLAYER_FINISH_MATCH,
            function*({ payload: { homeScore, awayScore } }) {
                const win = homeScore > awayScore;

                // wait for preparing phase to give money
                yield take(CLEAR_OPPONENT);

                const currentMoney: number = yield select((state: PlayerState) => state.playerInfo.money);
                const streak: number = yield select((state: PlayerState) => state.playerInfo.streak.amount);

                const rewardMoney = getMoneyForMatch(currentMoney, streak, win);

                // todo make addMoneyCommand
                yield put(moneyUpdateAction(currentMoney + rewardMoney));
                yield put(addXpCommand(1));
            }
        )
    });
};
