import { SagaMiddleware } from "redux-saga";
import { all, takeLatest, put, select } from "@redux-saga/core/effects";
import { finishedBattle, inProgressBattle } from "@creature-chess/models";

import { PLAYER_FINISH_MATCH, PlayerFinishMatchAction } from "../actions";
import { HasPlayerInfo, PlayerInfoActions } from "../playerInfo";

export const playerBattle = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield all([
            yield takeLatest<PlayerInfoActions.SetOpponentAction>(
                PlayerInfoActions.SET_OPPONENT,
                function*({ payload: { opponentId } }) {
                    yield put(PlayerInfoActions.battleUpdated(inProgressBattle(opponentId)));
                }
            ),
            yield takeLatest<PlayerFinishMatchAction>(
                PLAYER_FINISH_MATCH,
                function*({ payload: { homeScore, awayScore } }) {
                    const opponentId: string = yield select((state: HasPlayerInfo) => state.playerInfo.opponentId);

                    yield put(PlayerInfoActions.battleUpdated(finishedBattle(opponentId, homeScore, awayScore)));
                }
            )
        ]);
    });
};
