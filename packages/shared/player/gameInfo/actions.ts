import { ReadyUpAction } from "../actions";

export const SHOP_LOCK_UPDATED = "SHOP_LOCK_UPDATED";
export type SHOP_LOCK_UPDATED = typeof SHOP_LOCK_UPDATED;
export const MONEY_UPDATE = "MONEY_UPDATE";
export type MONEY_UPDATE = typeof MONEY_UPDATE;
export const SET_OPPONENT = "SET_OPPONENT";
export type SET_OPPONENT = typeof SET_OPPONENT;
export const CLEAR_OPPONENT = "CLEAR_OPPONENT";
export type CLEAR_OPPONENT = typeof CLEAR_OPPONENT;
export const LEVEL_UPDATE = "LEVEL_UPDATE";
export type LEVEL_UPDATE = typeof LEVEL_UPDATE;

export type UpdateShopLockAction = ({ type: SHOP_LOCK_UPDATED, payload: { locked: boolean } });
export type MoneyUpdateAction = ({ type: MONEY_UPDATE, payload: { money: number } });
export type SetOpponentAction = ({ type: SET_OPPONENT, payload: { opponentId: string } });
export type ClearOpponentAction = ({ type: CLEAR_OPPONENT });
export type LevelUpdateAction = ({
    type: LEVEL_UPDATE;
    payload: {
        level: number;
        xp: number;
    };
});

export type GameAction =
    UpdateShopLockAction
    | MoneyUpdateAction
    | ReadyUpAction
    | SetOpponentAction
    | ClearOpponentAction
    | LevelUpdateAction;

export const shopLockUpdated = (locked: boolean): UpdateShopLockAction => ({
    type: SHOP_LOCK_UPDATED,
    payload: { locked }
});

export const moneyUpdateAction = (money: number): MoneyUpdateAction => ({
    type: MONEY_UPDATE,
    payload: {
        money
    }
});

export const setOpponent = (opponentId: string): SetOpponentAction => ({ type: SET_OPPONENT, payload: { opponentId } });
export const clearOpponent = (): ClearOpponentAction => ({ type: CLEAR_OPPONENT });

export const setLevelAction = (level: number, xp: number): LevelUpdateAction => ({
    type: LEVEL_UPDATE,
    payload: {
        level, xp
    }
});
