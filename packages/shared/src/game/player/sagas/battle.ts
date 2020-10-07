import { SagaMiddleware } from "redux-saga";
import { all, takeLatest, put, select } from "@redux-saga/core/effects";
import { finishedBattle, inProgressBattle } from "@creature-chess/models";

import { PLAYER_FINISH_MATCH_EVENT, PlayerFinishMatchEvent } from "../events";
import { HasPlayerInfo, PlayerInfoCommands } from "../playerInfo";

export const playerBattle = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield all([
            yield takeLatest<PlayerInfoCommands.UpdateOpponentCommand>(
                PlayerInfoCommands.UPDATE_OPPONENT_COMMAND,
                function*({ payload: { opponentId } }) {
                    yield put(PlayerInfoCommands.updateBattleCommand(inProgressBattle(opponentId)));
                }
            ),
            yield takeLatest<PlayerFinishMatchEvent>(
                PLAYER_FINISH_MATCH_EVENT,
                function*({ payload: { homeScore, awayScore } }) {
                    const opponentId: string = yield select((state: HasPlayerInfo) => state.playerInfo.opponentId);

                    yield put(PlayerInfoCommands.updateBattleCommand(finishedBattle(opponentId, homeScore, awayScore)));
                }
            )
        ]);
    });
};
