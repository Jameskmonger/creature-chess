import { SagaMiddleware } from "redux-saga";
import { takeLatest, select, put } from "@redux-saga/core/effects";
import { StreakType } from "@creature-chess/models";
import { HasPlayerInfo, PlayerStreak } from "../playerInfo/reducer";

import { PLAYER_FINISH_MATCH, PlayerFinishMatchAction } from "../actions";
import { updateStreakCommand } from "../playerInfo/commands";

export const playerStreak = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield takeLatest<PlayerFinishMatchAction>(
            PLAYER_FINISH_MATCH,
            function*({ payload: { homeScore, awayScore } }) {
                const win = homeScore > awayScore;

                const type = win ? StreakType.WIN : StreakType.LOSS;

                const existingStreak: PlayerStreak = yield select((state: HasPlayerInfo) => state.playerInfo.streak);

                const newAmount = (type === existingStreak.type) ? existingStreak.amount + 1 : 0;

                yield put(updateStreakCommand(type, newAmount));
            }
        );
    });
};
