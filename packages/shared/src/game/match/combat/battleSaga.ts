import { takeEvery, select, put, call } from "@redux-saga/core/effects";
import { BoardState } from "../../../board";
import { GameOptions } from "../../options";
import { battleEventChannel, BattleEvent } from "./battleEventChannel";

const START_BATTLE = "START_BATTLE";
type START_BATTLE = typeof START_BATTLE;

export const startBattle = () => ({ type: START_BATTLE });

export const battle = function*(gameOptions: GameOptions) {
    yield takeEvery(
        START_BATTLE,
        function*() {
            const board: BoardState = yield select(state => state.board);

            const battleChannel = yield call(battleEventChannel, board, gameOptions, 100);

            yield takeEvery(battleChannel, function*(battleAction: BattleEvent) {
                yield put(battleAction);
            });
        }
    );
};
