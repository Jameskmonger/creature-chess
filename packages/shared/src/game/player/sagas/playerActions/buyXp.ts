import { Logger } from "winston";
import { take, select, put } from "@redux-saga/core/effects";
import { BUY_XP_ACTION } from "../../actions";
import { BUY_XP_AMOUNT, BUY_XP_COST, MAX_PLAYER_LEVEL } from "@creature-chess/models";
import { PlayerState } from "../../store";
import { isPlayerAlive } from "../../playerSelectors";
import { updateMoneyCommand } from "../../playerInfo/commands";
import { addXpCommand } from "../xp";

export const buyXpPlayerActionSagaFactory = <TState extends PlayerState>(
    getLogger: () => Logger,
    playerId: string,
    name: string
) => {
    return function*() {
        while (true) {
            yield take(BUY_XP_ACTION);

            getLogger().info(
                "BUY_XP_ACTION received",
                { playerId, name }
            );

            const isAlive: boolean = yield select(isPlayerAlive);

            if (isAlive === false) {
                getLogger().info(
                    "Player attempted to buy xp, but dead",
                    { actor: { playerId, name } }
                );
                continue;
            }

            const currentLevel: number = yield select((state: TState) => state.playerInfo.level);

            if (currentLevel === MAX_PLAYER_LEVEL) {
                getLogger().info(
                    "Player attempted to buy xp, but at max level",
                    { actor: { playerId, name } }
                );
                continue;
            }

            const money: number = yield select((state: TState) => state.playerInfo.money);

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
};
