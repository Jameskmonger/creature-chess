import { Logger } from "winston";
import { take, select, put } from "@redux-saga/core/effects";
import { BUY_XP_ACTION } from "../../actions";
import { BUY_XP_AMOUNT, BUY_XP_COST, MAX_PLAYER_LEVEL } from "@creature-chess/models";
import { PlayerState } from "../../store";
import { isPlayerAlive } from "../../playerSelectors";
import { updateMoneyCommand } from "../../playerInfo/commands";
import { addXpCommand } from "../xp";

export const buyXpPlayerActionSagaFactory = <TState extends PlayerState>(logger: Logger) => {
    return function*() {
        while (true) {
            yield take(BUY_XP_ACTION);

            const isAlive: boolean = yield select(isPlayerAlive);

            if (isAlive === false) {
                logger.info("Player attempted to buy xp, but dead");
                return;
            }

            const currentLevel: number = yield select((state: TState) => state.playerInfo.level);

            if (currentLevel === MAX_PLAYER_LEVEL) {
                logger.info("Player attempted to buy xp, but at max level");
                return;
            }

            const money: number = yield select((state: TState) => state.playerInfo.money);

            // not enough money
            if (money < BUY_XP_COST) {
                logger.info(`Player attempted to buy xp costing $${BUY_XP_COST} but only had $${money}`);

                yield put(updateMoneyCommand(money));

                return;
            }

            yield put(addXpCommand(BUY_XP_AMOUNT));
            yield put(updateMoneyCommand(money - BUY_XP_COST));
        }
    };
};
