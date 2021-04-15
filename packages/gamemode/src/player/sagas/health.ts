import { takeEvery, select, put, all } from "@redux-saga/core/effects";
import { PlayerState } from "../store";
import { updateHealthCommand, updateRoundDiedAtCommand } from "../playerInfo/commands";

const HEALTH_SUBTRACT_COMMAND = "HEALTH_SUBTRACT_COMMAND";
type HEALTH_SUBTRACT_COMMAND = typeof HEALTH_SUBTRACT_COMMAND;
type HealthSubtractCommand = ({ type: HEALTH_SUBTRACT_COMMAND, payload: { amount: number } });

export const subtractHealthCommand = (amount: number): HealthSubtractCommand => ({
    type: HEALTH_SUBTRACT_COMMAND,
    payload: { amount }
});

export const healthSagaFactory = <TState extends PlayerState>() => {
    return function*() {
        yield all([
            yield takeEvery<HealthSubtractCommand>(
                HEALTH_SUBTRACT_COMMAND,
                function*({ payload: { amount } }) {
                    const state: TState = yield select();

                    const oldValue = state.playerInfo.health;

                    let newValue = oldValue - amount;
                    newValue = (newValue < 0) ? 0 : newValue;

                    yield put(updateHealthCommand(newValue));
                }
            )
        ]);
    };
};
