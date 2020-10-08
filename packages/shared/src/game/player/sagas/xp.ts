import { take, select, put } from "@redux-saga/core/effects";
import { PlayerState } from "../store";
import { updateLevelCommand } from "../playerInfo/commands";
import { getXpToNextLevel } from "../../../utils";

const ADD_XP_COMMAND = "ADD_XP_COMMAND";
type ADD_XP_COMMAND = typeof ADD_XP_COMMAND;
type AddXpCommand = ({ type: ADD_XP_COMMAND, payload: { amount: number } });
export const addXpCommand = (amount: number): AddXpCommand => ({
    type: ADD_XP_COMMAND,
    payload: { amount }
});

export const xpSagaFactory = <TState extends PlayerState>() => {
    return function*() {
        while (true) {
            const { payload: { amount } }: AddXpCommand = yield take(ADD_XP_COMMAND);
            let level: number = yield select((state: TState) => state.playerInfo.level);
            let xp: number = yield select((state: TState) => state.playerInfo.xp);

            for (let i = 0; i < amount; i++) {
                const toNextLevel = getXpToNextLevel(level);
                const newXp = xp + 1;

                if (newXp === toNextLevel) {
                    xp = 0;
                    level++;
                } else {
                    xp = newXp;
                }
            }

            yield put(updateLevelCommand(level, xp));
        }
    };
};
