import { takeEvery, select, put, call } from "@redux-saga/core/effects";
import { Piece } from "../../models";
import { battleEventChannel, BattleAction } from "./battleEventChannel";
import { TurnSimulator } from "./turnSimulator";
import { BoardState } from "@common/board";

const START_BATTLE = "START_BATTLE";
type START_BATTLE = typeof START_BATTLE;

export const startBattle = () => ({ type: START_BATTLE });

export const battle = function*(turnSimulator: TurnSimulator, turnCount: number, turnDuration: number) {
    yield takeEvery(
        START_BATTLE,
        function*() {
            const board: BoardState = yield select(state => state.board);

            const battleChannel = yield call(battleEventChannel, turnSimulator, turnDuration, board, turnCount, 100);

            yield takeEvery(battleChannel, function*(battleAction: BattleAction) {
                yield put(battleAction);
            });
        }
    );
};
