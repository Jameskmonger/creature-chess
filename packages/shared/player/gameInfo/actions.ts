import { ServerToClient } from "../../networking";

export const GAME_PHASE_UPDATE = "GAME_PHASE_UPDATE";
export type GAME_PHASE_UPDATE = typeof GAME_PHASE_UPDATE;
export const MONEY_UPDATE = "MONEY_UPDATE";
export type MONEY_UPDATE = typeof MONEY_UPDATE;

export type GamePhaseUpdateAction = ({ type: GAME_PHASE_UPDATE, payload: ServerToClient.PhaseUpdatePacket });
export type MoneyUpdateAction = ({ type: MONEY_UPDATE, payload: { money: number } });

export type GameAction = GamePhaseUpdateAction | MoneyUpdateAction;

export const gamePhaseUpdate = (packet: ServerToClient.PhaseUpdatePacket) => ({
    type: GAME_PHASE_UPDATE,
    payload: packet
});

export const moneyUpdateAction = (money: number): MoneyUpdateAction => ({
    type: MONEY_UPDATE,
    payload: {
        money
    }
});
