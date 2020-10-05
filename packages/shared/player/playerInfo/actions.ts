import { Card, StreakType } from "@creature-chess/models";
import { ReadyUpAction } from "../actions";

export const HEALTH_UPDATED = "HEALTH_UPDATED";
export type HEALTH_UPDATED = typeof HEALTH_UPDATED;
export const STREAK_UPDATED = "STREAK_UPDATED";
export type STREAK_UPDATED = typeof STREAK_UPDATED;
export const ROUND_DIED_AT_UPDATED = "ROUND_DIED_AT_UPDATED";
export type ROUND_DIED_AT_UPDATED = typeof ROUND_DIED_AT_UPDATED;
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
export const CARDS_UPDATED = "CARDS_UPDATED";
export type CARDS_UPDATED = typeof CARDS_UPDATED;

export type UpdateHealthAction = ({ type: HEALTH_UPDATED, payload: { health: number } });
export type UpdateStreakAction = ({ type: STREAK_UPDATED, payload: { type: StreakType, amount: number } });
export type UpdateRoundDiedAtAction = ({ type: ROUND_DIED_AT_UPDATED, payload: { roundDiedAt: number | null } });
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
export type CardsUpdatedAction = ({ type: CARDS_UPDATED, payload: { cards: Card[] } });

export type GameAction =
    UpdateHealthAction
    | UpdateStreakAction
    | UpdateRoundDiedAtAction
    | UpdateShopLockAction
    | MoneyUpdateAction
    | ReadyUpAction
    | SetOpponentAction
    | ClearOpponentAction
    | LevelUpdateAction
    | CardsUpdatedAction;

export const healthUpdated = (health: number): UpdateHealthAction => ({ type: HEALTH_UPDATED, payload: { health } });
export const streakUpdated = (type: StreakType, amount: number): UpdateStreakAction => ({
    type: STREAK_UPDATED,
    payload: { type, amount }
});
export const roundDiedAtUpdated = (roundDiedAt: number | null): UpdateRoundDiedAtAction => ({ type: ROUND_DIED_AT_UPDATED, payload: { roundDiedAt } });
export const shopLockUpdated = (locked: boolean): UpdateShopLockAction => ({ type: SHOP_LOCK_UPDATED, payload: { locked } });

export const moneyUpdateAction = (money: number): MoneyUpdateAction => ({ type: MONEY_UPDATE, payload: { money } });

export const setOpponent = (opponentId: string): SetOpponentAction => ({ type: SET_OPPONENT, payload: { opponentId } });
export const clearOpponent = (): ClearOpponentAction => ({ type: CLEAR_OPPONENT });

export const setLevelAction = (level: number, xp: number): LevelUpdateAction => ({
    type: LEVEL_UPDATE,
    payload: {
        level, xp
    }
});

export const cardsUpdated = (cards: Card[]): CardsUpdatedAction => ({
    type: CARDS_UPDATED,
    payload: {
        cards
    }
});
