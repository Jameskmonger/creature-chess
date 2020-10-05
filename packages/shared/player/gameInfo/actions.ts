import { ServerToClient } from "../../networking";

export const GAME_PHASE_UPDATE = "GAME_PHASE_UPDATE";
export type GAME_PHASE_UPDATE = typeof GAME_PHASE_UPDATE;
export const SHOP_LOCK_UPDATED = "SHOP_LOCK_UPDATED";
export type SHOP_LOCK_UPDATED = typeof SHOP_LOCK_UPDATED;
export const MONEY_UPDATE = "MONEY_UPDATE";
export type MONEY_UPDATE = typeof MONEY_UPDATE;

export type GamePhaseUpdateAction = ({ type: GAME_PHASE_UPDATE, payload: ServerToClient.PhaseUpdatePacket });
export type UpdateShopLockAction = ({ type: SHOP_LOCK_UPDATED, payload: { locked: boolean } });
export type MoneyUpdateAction = ({ type: MONEY_UPDATE, payload: { money: number } });

export type GameAction =
    GamePhaseUpdateAction
    | UpdateShopLockAction
    | MoneyUpdateAction;

export const gamePhaseUpdate = (packet: ServerToClient.PhaseUpdatePacket) => ({
    type: GAME_PHASE_UPDATE,
    payload: packet
});

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
