import { SagaMiddleware } from "redux-saga";
import { all, takeLatest, put, select } from "@redux-saga/core/effects";
import { battleUpdated, SetOpponentAction, SET_OPPONENT } from "packages/shared/player/playerInfo";
import { finishedBattle, inProgressBattle } from "@creature-chess/models/src/player-list-player";

import { PLAYER_FINISH_MATCH, PlayerFinishMatchAction } from "../actions";
import { HasPlayerInfo } from "packages/shared/player/playerInfo/reducer";

export const playerBattle = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield all([
            yield takeLatest<SetOpponentAction>(
                SET_OPPONENT,
                function*({ payload: { opponentId } }) {
                    yield put(battleUpdated(inProgressBattle(opponentId)));
                }
            ),
            yield takeLatest<PlayerFinishMatchAction>(
                PLAYER_FINISH_MATCH,
                function*({ payload: { homeScore, awayScore } }) {
                    const opponentId: string = yield select((state: HasPlayerInfo) => state.playerInfo.opponentId);

                    yield put(battleUpdated(finishedBattle(opponentId, homeScore, awayScore)));
                }
            )
        ]);
    });
};
