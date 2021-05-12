import { SagaMiddleware } from "redux-saga";
import { all, takeLatest, put, select } from "@redux-saga/core/effects";
import { finishedBattle, inProgressBattle } from "@creature-chess/models";

import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../events";
import { HasPlayerInfo, PlayerInfoCommands } from "../playerInfo";

export const playerBattle = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(function*() {
        yield all([
            takeLatest<PlayerInfoCommands.UpdateOpponentCommand>(
                PlayerInfoCommands.UPDATE_OPPONENT_COMMAND,
                function*({ payload: { opponentId } }) {
                    yield put(PlayerInfoCommands.updateBattleCommand(inProgressBattle(opponentId)));
                }
            ),
            takeLatest<PlayerFinishMatchEvent>(
                playerFinishMatchEvent.toString(),
                function*({ payload: { homeScore, awayScore } }) {
                    const opponentId: string = yield select((state: HasPlayerInfo) => state.playerInfo.opponentId);

                    yield put(PlayerInfoCommands.updateBattleCommand(finishedBattle(opponentId, homeScore, awayScore)));
                }
            )
        ]);
    });
};
