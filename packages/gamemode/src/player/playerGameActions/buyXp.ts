import { take, select, put, getContext } from "@redux-saga/core/effects";
import { BUY_XP_AMOUNT, BUY_XP_COST, MAX_PLAYER_LEVEL } from "@creature-chess/models";
import { isPlayerAlive } from "../playerSelectors";
import { updateMoneyCommand } from "../playerInfo/commands";
import { addXpCommand } from "../sagas/xp";
import { createAction } from "@reduxjs/toolkit";

export type BuyXpPlayerAction = ReturnType<typeof buyXpPlayerAction>;
export const buyXpPlayerAction = createAction("buyXpPlayerAction");

export const buyXpPlayerActionSaga = function*() {
    while (true) {
        const playerId = yield getContext("playerId");
        const name = yield getContext("playerName");
        const { getLogger } = yield getContext("dependencies");

        yield take(buyXpPlayerAction.toString());

        getLogger().info(
            "BUY_XP_ACTION received",
            { actor: { playerId, name } }
        );

        const isAlive: boolean = yield select(isPlayerAlive);

        if (isAlive === false) {
            getLogger().info(
                "Player attempted to buy xp, but dead",
                { actor: { playerId, name } }
            );
            continue;
        }

        const currentLevel: number = yield select(state => state.playerInfo.level);

        if (currentLevel === MAX_PLAYER_LEVEL) {
            getLogger().info(
                "Player attempted to buy xp, but at max level",
                { actor: { playerId, name } }
            );
            continue;
        }

        const money: number = yield select(state => state.playerInfo.money);

        // not enough money
        if (money < BUY_XP_COST) {
            getLogger().info(
                "Not enough money to buy xp",
                {
                    actor: { playerId, name },
                    details: {
                        money,
                        cost: BUY_XP_COST
                    }
                }
            );

            yield put(updateMoneyCommand(money));

            continue;
        }

        yield put(addXpCommand(BUY_XP_AMOUNT));
        yield put(updateMoneyCommand(money - BUY_XP_COST));
    }
};
