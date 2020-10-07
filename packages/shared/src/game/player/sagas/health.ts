import { takeEvery, select, put, all } from "@redux-saga/core/effects";
import { PlayerState } from "../store";
import { updateHealthCommand, updateRoundDiedAtCommand } from "../playerInfo/commands";

const HEALTH_SUBTRACT_COMMAND = "HEALTH_SUBTRACT_COMMAND";
type HEALTH_SUBTRACT_COMMAND = typeof HEALTH_SUBTRACT_COMMAND;
type HealthSubtractCommand = ({ type: HEALTH_SUBTRACT_COMMAND, payload: { currentRound: number, amount: number } });

// todo remove currentround from here
export const subtractHealthCommand = (currentRound: number, amount: number): HealthSubtractCommand => ({
    type: HEALTH_SUBTRACT_COMMAND,
    payload: { currentRound, amount }
});

export const healthSagaFactory = <TState extends PlayerState>() => {
    return function*() {
        yield all([
            yield takeEvery<HealthSubtractCommand>(
                HEALTH_SUBTRACT_COMMAND,
                function*({ payload: { currentRound, amount } }) {
                    const state: TState = yield select();

                    const oldValue = state.playerInfo.health;

                    let newValue = oldValue - amount;
                    newValue = (newValue < 0) ? 0 : newValue;

                    yield put(updateHealthCommand(newValue));

                    if (newValue === 0 && oldValue !== 0) {
                        // player has just died
                        yield put(updateRoundDiedAtCommand(currentRound));
                    }
                }
            )
        ])
    };
};
