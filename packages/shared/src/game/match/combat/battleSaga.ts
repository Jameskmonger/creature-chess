import { takeEvery, select, put, call } from "@redux-saga/core/effects";
import { BoardState } from "../../../board";
import { GameOptions } from "../../options";
import { battleEventChannel, BattleEvent } from "./battleEventChannel";

const START_BATTLE = "START_BATTLE";
type START_BATTLE = typeof START_BATTLE;
type StartBattleCommand = { type: START_BATTLE, payload: { turn?: number }};
export const startBattle = (turn?: number): StartBattleCommand => ({ type: START_BATTLE, payload: { turn } });

export const battle = function*(gameOptions: GameOptions) {
    yield takeEvery<StartBattleCommand>(
        START_BATTLE,
        function*({ payload: { turn } }) {
            const board: BoardState = yield select(state => state.board);

            const battleChannel = yield call(battleEventChannel, board, turn || 0, gameOptions, 100);

            yield takeEvery(battleChannel, function*(battleAction: BattleEvent) {
                yield put(battleAction);
            });
        }
    );
};
