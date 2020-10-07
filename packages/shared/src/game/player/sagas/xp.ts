import { all, takeEvery, select, put } from "@redux-saga/core/effects";
import { PlayerState } from "../store";
import { moneyUpdateAction, setLevelAction } from "../playerInfo/actions";
import { getXpToNextLevel } from "../../../utils";
import { BUY_XP, BuyXpAction } from "../actions";
import { isPlayerAlive } from "../playerSelectors";
import { BUY_XP_AMOUNT, BUY_XP_COST, MAX_PLAYER_LEVEL } from "@creature-chess/models";

const ADD_XP_COMMAND = "ADD_XP_COMMAND";
type ADD_XP_COMMAND = typeof ADD_XP_COMMAND;
type AddXpCommand = ({ type: ADD_XP_COMMAND, payload: { amount: number } });
export const addXpCommand = (amount: number): AddXpCommand => ({
    type: ADD_XP_COMMAND,
    payload: { amount }
});

export const xpSagaFactory = <TState extends PlayerState>() => {
    return function*() {
        yield all([
            yield takeEvery<AddXpCommand>(
                ADD_XP_COMMAND,
                function*({ payload: { amount } }) {
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

                    yield put(setLevelAction(level, xp));
                }
            ),
            yield takeEvery<BuyXpAction>(
                BUY_XP,
                function*() {
                    const isAlive: boolean = yield select(isPlayerAlive);

                    if (isAlive === false) {
                        console.log("Attempted to reroll, but dead");
                        return;
                    }

                    const currentLevel: number = yield select((state: PlayerState) => state.playerInfo.level);

                    if (currentLevel === MAX_PLAYER_LEVEL) {
                        console.log("Attempted to buy xp, but at max level");
                        return;
                    }

                    const money: number = yield select((state: PlayerState) => state.playerInfo.money);

                    // not enough money
                    if (money < BUY_XP_COST) {
                        console.log(`Attempted to buy xp costing $${BUY_XP_COST} but only had $${money}`);
                        return;
                    }

                    yield put(addXpCommand(BUY_XP_AMOUNT));
                    yield put(moneyUpdateAction(money - BUY_XP_COST));
                }
            )
        ])
    };
};
