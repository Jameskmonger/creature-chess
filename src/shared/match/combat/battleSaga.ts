import { takeEvery, select, put, call } from "@redux-saga/core/effects";
import { Piece } from "../../models";
import { battleEventChannel, BattleAction } from "./battleEventChannel";
import { TurnSimulator } from "./turnSimulator";
import { DefinitionProvider } from "../../game/definitionProvider";
import { TURNS_IN_BATTLE, TURN_DURATION_MS } from "../../constants";

const START_BATTLE = "START_BATTLE";
type START_BATTLE = typeof START_BATTLE;

export const startBattle = () => ({ type: START_BATTLE });

export const battle = function*<TState extends { board: Piece[] }>(turnSimulator: TurnSimulator) {
    yield takeEvery(
        START_BATTLE,
        function*() {
            const { board }: TState = yield select();

            const battleChannel = yield call(battleEventChannel, turnSimulator, TURN_DURATION_MS, board, TURNS_IN_BATTLE);

            yield takeEvery(battleChannel, function*(battleAction: BattleAction) {
                yield put(battleAction);
            });
        }
    );
};
