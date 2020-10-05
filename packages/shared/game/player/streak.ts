import { SagaMiddleware } from "redux-saga";
import { takeLatest, select, put } from "@redux-saga/core/effects";
import { StreakType } from "@creature-chess/models";
import { HasPlayerInfo, PlayerStreak } from "../../player/playerInfo/reducer";
import { streakUpdated } from "packages/shared/player/playerInfo";

const PLAYER_FINISH_MATCH = "PLAYER_FINISH_MATCH";
type PLAYER_FINISH_MATCH = typeof PLAYER_FINISH_MATCH;

type PlayerFinishMatchAction = ({ type: PLAYER_FINISH_MATCH, payload: { homeScore: number, awayScore: number } });

export const playerFinishMatch = (homeScore: number, awayScore: number): PlayerFinishMatchAction => ({
    type: PLAYER_FINISH_MATCH,
    payload: { homeScore, awayScore }
});

export const playerStreak = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield takeLatest<PlayerFinishMatchAction>(
            PLAYER_FINISH_MATCH,
            function*({ payload: { homeScore, awayScore } }) {
                const win = homeScore > awayScore;

                const type = win ? StreakType.WIN : StreakType.LOSS;

                const existingStreak: PlayerStreak = yield select((state: HasPlayerInfo) => state.playerInfo.streak);

                const newAmount = (type === existingStreak.type) ? existingStreak.amount + 1 : 0;

                yield put(streakUpdated(type, newAmount));
            }
        );
    });
};
