import { takeEvery, select, put, call } from "@redux-saga/core/effects";
import { Piece } from "../../models";
import { battleEventChannel, BattleAction } from "./battleEventChannel";
import { TurnSimulator } from "./turnSimulator";

const START_BATTLE = "START_BATTLE";
type START_BATTLE = typeof START_BATTLE;

export const startBattle = () => ({ type: START_BATTLE });

export const battle = function*<TState extends { board: Piece[] }>(turnSimulator: TurnSimulator, turnCount: number, turnDuration: number) {
    yield takeEvery(
        START_BATTLE,
        function*() {
            const { board }: TState = yield select();

            const battleChannel = yield call(battleEventChannel, turnSimulator, turnDuration, board, turnCount, 100);

            yield takeEvery(battleChannel, function*(battleAction: BattleAction) {
                yield put(battleAction);
            });
        }
    );
};
