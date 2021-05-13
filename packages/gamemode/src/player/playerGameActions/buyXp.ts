import { take, put } from "@redux-saga/core/effects";
import { select, getContext } from "typed-redux-saga";
import { BUY_XP_AMOUNT, BUY_XP_COST, MAX_PLAYER_LEVEL } from "@creature-chess/models";
import { isPlayerAlive } from "../playerSelectors";
import { updateMoneyCommand } from "../playerInfo/commands";
import { addXpCommand } from "../sagas/xp";
import { createAction } from "@reduxjs/toolkit";
import { PlayerSagaDependencies } from "../sagaContext";

export type BuyXpPlayerAction = ReturnType<typeof buyXpPlayerAction>;
export const buyXpPlayerAction = createAction("buyXpPlayerAction");

export const buyXpPlayerActionSaga = function*() {
    while (true) {
        const playerId = yield* getContext<string>("playerId");
        const name = yield* getContext<string>("playerName");
        const { getLogger } = yield* getContext<PlayerSagaDependencies>("dependencies");

        yield take(buyXpPlayerAction.toString());

        getLogger().info(
            "BUY_XP_ACTION received",
            { actor: { playerId, name } }
        );

        const isAlive = yield* select(isPlayerAlive);

        if (isAlive === false) {
            getLogger().info(
                "Player attempted to buy xp, but dead",
                { actor: { playerId, name } }
            );
            continue;
        }

        const currentLevel = yield* select(state => state.playerInfo.level);

        if (currentLevel === MAX_PLAYER_LEVEL) {
            getLogger().info(
                "Player attempted to buy xp, but at max level",
                { actor: { playerId, name } }
            );
            continue;
        }

        const money = yield* select(state => state.playerInfo.money);

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
